import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { useLife, useRefreshLife } from '@hooks/useLife';
import { Client, type IMessage } from '@stomp/stompjs';
import { useAuthStore } from '@stores/auth';
import { type Player, type Room, type RoomDetails, useRoomStore } from '@stores/room';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

export default function MultiRoomBody() {
  const navigate = useNavigate();
  const { data: life = 0 } = useLife();
  const refreshLife = useRefreshLife();
  const { state } = useLocation();
  const roomData = state as { room?: Room; entry?: 'random' | 'invite'; roomId?: string } | null;
  const entry = roomData?.entry ?? 'invite'; // 🔹 entry 추가 (random | invite)
  const roomIdFromState = roomData?.roomId; // 🔹 랜덤 모드일 때 넘겨준 roomId

  const { accessToken } = useAuthStore();
  const { code } = useParams<{ code: string }>();

  // 🔹 entry === 'random'이면 roomIdFromState 사용, 초대면 기존 code 사용
  const effectiveRoomId = entry === 'random' ? roomIdFromState : code;

  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const navGuardRef = useRef({ toPlay: false, toResult: false });

  const [client, setClient] = useState<Client | null>(null);
  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    clientRef.current = client;
  }, [client]);

  // 초대 모드일 때만 roomData(room) 저장
  useEffect(() => {
    if (entry !== 'invite' || !roomData?.room) return;
    const prev = useRoomStore.getState().room;
    if (prev?.inviteCode !== roomData.room.inviteCode) {
      useRoomStore.getState().setRoom(roomData.room);
    }
  }, [entry, roomData]);

  const connectedKeyRef = useRef<string | null>(null);

  // 소켓 연결
  useEffect(() => {
    if (!code || !accessToken) return;

    const key = `${code}:${accessToken}`;
    if (connectedKeyRef.current === key) return;
    connectedKeyRef.current = key;

    const { setRoomDetails, setQuestion, setRemainingTime, setAnswerResult, setLeaderBoard, setQuizResult } =
      useRoomStore.getState();

    const c = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_BACKEND_URL}?authorization=${accessToken}`),
      reconnectDelay: 3000,
      onConnect: () => {
        setClient(c);

        if (entry === 'invite') {
          // 🔹 초대 모드: /user/queue/room 구독 + join publish
          c.subscribe('/user/queue/room', (message: IMessage) => {
            const body = JSON.parse(message.body);
            if (body.type === 'JOINED_ROOM') {
              const initialRoomDetails: RoomDetails = body.data;
              setRoomDetails(initialRoomDetails);
            }
          });

          c.publish({ destination: '/app/room/join', body: JSON.stringify({ inviteCode: code }) });
        }

        // 🔹 랜덤: /topic/game/{roomId}, 초대: /topic/room/{roomId}
        const topic = entry === 'random' ? `/topic/game/${effectiveRoomId}` : `/topic/room/${effectiveRoomId}`;

        c.subscribe(topic, (message: IMessage) => {
          const body = JSON.parse(message.body);
          console.log('📢 ============= 알립니다 ============= 📢', body);

          switch (body.type) {
            case 'PLAYER_JOINED':
              setRoomDetails((prev) => {
                if (!prev) return prev;
                const { email, name, isHost, picture } = body.data as Player;
                if (prev.players.some((p) => p.email === email)) return prev;
                const newPlayer: Player = {
                  email,
                  name,
                  picture,
                  isHost: typeof isHost === 'boolean' ? isHost : name === prev.hostName,
                };
                const players = [...prev.players, newPlayer];
                return { ...prev, players, currentPlayers: players.length, canStartGame: players.length >= 2 };
              });
              break;

            case 'PLAYER_LEFT':
              setRoomDetails((prev) => {
                if (!prev) return prev;
                const { name } = body.data as { name: string };
                const players = prev.players.filter((p) => p.name !== name);
                return { ...prev, players, currentPlayers: players.length, canStartGame: players.length >= 2 };
              });
              break;

            case 'MESSAGE':
              if (body.message === '방장이 퇴장하여 방이 해체되었습니다.') {
                handleLeave();
              }
              break;

            case 'GAME_START':
              if (!navGuardRef.current.toPlay) {
                navGuardRef.current.toPlay = true;
                navigateRef.current('play', {
                  replace: true,
                  state: { __bypassGuard: true }, // 가드 우회
                });
              }
              break;

            case 'QUESTION':
              setAnswerResult(null);
              setQuestion({ questionIndex: body.questionIndex, question: body.question, options: body.options });
              break;

            case 'TIMER':
              setRemainingTime(body.remainingTime);
              break;

            case 'TIME_UP':
              refreshLife(); // life 최신화
              break;

            case 'ANSWER_RESULT':
              setAnswerResult({
                correct: body.correct,
                correctAnswer: body.correctAnswer,
                message: body.message,
                userSelectedIndex: body.userSelectedIndex,
                userEmail: body.userEmail,
                userName: body.userName,
              });
              break;

            case 'LEADERBOARD':
              setLeaderBoard({ currentLeader: body.currentLeader, scores: body.scores });
              break;

            case 'GAME_END_RANKING':
              setQuizResult({ message: body.message, rankings: body.data.rankings });
              if (!navGuardRef.current.toResult) {
                navGuardRef.current.toResult = true;
                setTimeout(() => {
                  navigateRef.current('result', {
                    replace: true,
                    state: { __bypassGuard: true }, // 가드 우회
                  });
                }, 3000);
              }
              break;

            default:
              break;
          }
        });

        c.publish({ destination: '/app/room/join', body: JSON.stringify({ inviteCode: code }) });
      },
    });

    c.activate();

    return () => {
      connectedKeyRef.current = null;
      c.deactivate();
      setClient(null);
    };
  }, [accessToken, code]);

  // 게임 시작
  const handleStartGame = () => {
    const c = clientRef.current;
    const rd = useRoomStore.getState().roomDetails;
    if (c && rd) {
      c.publish({ destination: `/app/room/${rd.roomId}/start`, body: '' });
    }
  };

  // ✅ 정답 제출: 모드별로 destination 분기
  const handleAnswerSubmit = (answerIndex: number) => {
    const c = clientRef.current;
    const { roomDetails: rd, question: q } = useRoomStore.getState();
    if (!c || !q) return;

    if (entry === 'random') {
      // 랜덤 매칭 채점 경로
      c.publish({
        destination: `/app/game/${effectiveRoomId}/answer`,
        body: JSON.stringify({ questionIndex: q.questionIndex, index: answerIndex }),
      });
    } else {
      // 초대 매칭 채점 경로
      c.publish({
        destination: `/app/room/${rd?.roomId}/answer`,
        body: JSON.stringify({ questionIndex: q.questionIndex, index: answerIndex }),
      });
    }
  };

  // 퇴장
  const handleLeave = () => {
    const c = clientRef.current;
    const rd = useRoomStore.getState().roomDetails;

    if (c && rd) {
      c.publish({ destination: `/app/room/${rd.roomId}/leave`, body: '' });
    }

    c?.deactivate();
    setClient(null);

    useRoomStore.getState().clear();

    navigateRef.current('/multi', { replace: true });
  };

  return (
    <div className='ds-layout-padding flex min-h-dvh w-full flex-col'>
      <BackHeader
        preventBackNavigation
        bypassPaths={[/\/multi-room\/[^/]+\/result$/]}
        rightSlot={<LifeCounter life={life} />}
        to='/multi'
        onBeforeNavigate={handleLeave}
      />
      <main className='flex flex-1 flex-col py-16'>
        <Outlet context={{ handleLeave, handleStartGame, handleAnswerSubmit }} />
      </main>
    </div>
  );
}
