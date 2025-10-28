// import NextQuizLoading from '@assets/images/multi-quiz-ready.webp';
import QuizLoading from '@assets/images/quiz-creation.webp';
import { LifeCounter, useToast } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { useLife, useRefreshLife } from '@hooks/useLife';
import { Client, type IMessage } from '@stomp/stompjs';
import { useAuthStore } from '@stores/auth';
import { type Player, type Room, type RoomDetails, useRoomStore } from '@stores/room';
import { bounceLoop } from '@utils/motionUtils';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

export default function MultiRoomBody() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: life = 0 } = useLife();
  const refreshLife = useRefreshLife();
  const { state } = useLocation();
  const roomData = state as { room?: Room; entry?: 'random' | 'invite'; roomId?: string } | null;
  const entry = roomData?.entry ?? 'invite'; // 진입 모드 : random | invite
  const roomIdFromState = roomData?.roomId; // 랜덤 모드일 때 넘겨준 roomId

  const { accessToken } = useAuthStore();
  const { code } = useParams<{ code: string }>();

  const [gameLoading, setGameLoading] = useState(false);
  // const [betweenQuestionLoading, setBetweenQuestionLoading] = useState(false);
  // const [countdown, setCountdown] = useState<number | null>(null);

  // entry === 'random'이면 roomIdFromState 사용, 초대면 기존 code 사용
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

  useEffect(() => {
    // 랜덤 모드에서 play 화면이면: 첫 QUESTION 전까지 로딩
    if (entry === 'random' && location.pathname.endsWith('/play')) {
      setGameLoading(true);
    }
  }, [entry]);

  const connectedKeyRef = useRef<string | null>(null);

  // useEffect(() => {
  //   if (countdown == null) return;

  //   if (countdown > 0) {
  //     const timer = setTimeout(() => {
  //       setCountdown((prev) => (prev != null ? prev - 1 : null));
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [countdown]);

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
          // 초대 모드: /user/queue/room 구독 + join publish
          c.subscribe('/user/queue/room', (message: IMessage) => {
            const body = JSON.parse(message.body);
            if (body.type === 'JOINED_ROOM') {
              const initialRoomDetails: RoomDetails = body.data;
              setRoomDetails(initialRoomDetails);
            }
          });

          c.publish({ destination: '/app/room/join', body: JSON.stringify({ inviteCode: code }) });
        }

        // 랜덤 모드 : /topic/game/{roomId}, 초대 모드 : /topic/room/{roomId}
        const topic = entry === 'random' ? `/topic/game/${effectiveRoomId}` : `/topic/room/${effectiveRoomId}`;

        c.subscribe(topic, (message: IMessage) => {
          const body = JSON.parse(message.body);
          // console.log('📢 ============= 알립니다 ============= 📢', body);

          switch (body.type) {
            case 'JOINED_ROOM': {
              const initialRoomDetails: RoomDetails = body.data;
              setRoomDetails(initialRoomDetails);
              break;
            }
            case 'PLAYER_JOINED': {
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

              const playerName =
                entry === 'random' ? '상대 플레이어가' : `${(body.data as Player).name ?? '상대 플레이어'}님이`;

              toast({
                description: `${playerName} 입장했어요`,
                type: 'default',
              });

              break;
            }

            case 'PLAYER_LEFT': {
              setRoomDetails((prev) => {
                if (!prev) return prev;
                const { name } = body.data as { name: string };
                const players = prev.players.filter((p) => p.name !== name);
                return { ...prev, players, currentPlayers: players.length, canStartGame: players.length >= 2 };
              });

              const playerName =
                entry === 'random' ? '상대 플레이어가' : `${(body.data as Player).name ?? '상대 플레이어'}님이`;

              toast({
                description: `${playerName} 나갔어요`,
                type: 'default',
              });
              break;
            }

            case 'MESSAGE':
              if (body.message === '방장이 퇴장하여 방이 해체되었습니다.') {
                toast({
                  description: '방장이 나가서 더 이상 참여할 수 없어요',
                  type: 'default',
                });

                handleLeave();
              }
              break;

            case 'GAME_START_NOTIFICATION':
              setGameLoading(true);
              break;

            case 'GAME_START':
              setGameLoading(false);
              if (!navGuardRef.current.toPlay) {
                navGuardRef.current.toPlay = true;
                navigateRef.current('play', {
                  replace: true,
                  state: { __bypassGuard: true }, // 가드 우회
                });
              }
              break;

            case 'QUESTION':
              setGameLoading(false);
              // setBetweenQuestionLoading(false);
              // setCountdown(null);
              setAnswerResult(null);
              setQuestion({ questionIndex: body.questionIndex, question: body.question, options: body.options });
              break;

            case 'TIMER':
              setRemainingTime(body.remainingTime);
              break;

            case 'TIMER_STOP':
              // 서버에서 "정답! 다음 문제로 이동" 이벤트 오면 바로 로딩 시작
              // setCountdown(3);
              // setBetweenQuestionLoading(true);
              break;

            case 'LOADING':
              // 서버 메시지 내용 활용해서 UI 업데이트 가능
              // setBetweenQuestionLoading(true);
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

      {gameLoading && (
        <div
          aria-busy='true'
          aria-live='polite'
          className='ds-theme-bg-backdrop fixed inset-0 z-10 flex h-screen w-screen items-center justify-center'
        >
          <div className='ds-theme-bg-base flex h-full w-full max-w-480 min-w-320 items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-12'>
              <motion.img
                alt='Quiz Loading'
                animate='animate'
                className='mb-20 size-200 object-contain'
                src={QuizLoading}
                variants={bounceLoop}
              />
              <h1 className='ds-typ-title-1'>두근두근, 퀴즈 준비 중...</h1>
              <p className='ds-typ-body-2 ds-text-caption'>곧 시작하니 잠시만 기다려주세요!</p>
            </div>
          </div>
        </div>
      )}

      {/* 정답 이후 다음 퀴즈로 넘어갈 때 로딩 => 3초 안에 로딩창과 정답자 공개를 같이 하려니 바빠서 보류 */}
      {/* {betweenQuestionLoading && (
        <div
          aria-busy='true'
          aria-live='polite'
          className='ds-theme-bg-base fixed inset-0 z-50 flex h-screen w-screen items-center justify-center'
        >
          <div className='flex flex-col items-center justify-center gap-12'>
            <img alt='다음 문제 준비 중' className='mb-20 size-200 object-contain' src={NextQuizLoading} />
            <h1 className='ds-typ-title-1'>준비해 주세요</h1>
            <p className='ds-typ-body-2 ds-text-caption'>
              <span className='text-primary-500'>{countdown ?? 0}초</span> 뒤 다음 퀴즈가 시작됩니다
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}
