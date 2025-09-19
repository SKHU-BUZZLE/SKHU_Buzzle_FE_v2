import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '@stores/auth';
import { RoomProvider, useRoom } from '@stores/room';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

interface Room {
  category: string;
  hostName: string;
  inviteCode: string;
  maxPlayers: number;
  quizCount: number;
}

export default function MultiRoomLayout() {
  const { state } = useLocation();
  const roomData = (state as { room?: Room } | null)?.room;
  // console.log('roomData', roomData);

  return (
    // <div className='ds-layout-padding flex min-h-dvh w-full flex-col'>
    //   <BackHeader rightSlot={<LifeCounter life={50} />} to='/home' />
    <RoomProvider /* (선택) initialRoom={roomData} 로 확장 가능 */>
      <MultiRoomBody roomData={roomData} />
    </RoomProvider>
    // </div>
  );
}

export function MultiRoomBody({ roomData }: { roomData?: Room }) {
  const navigate = useNavigate();
  const { room, setRoom, roomDetails, setRoomDetails, question, setQuestion, setAnswerResult } = useRoom();
  const { accessToken } = useAuthStore();
  const { code } = useParams<{ code: string }>(); // 참여 코드
  const startedRef = useRef(false);

  const [_, setIsConnected] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  // 최신 client를 담아두는 ref (subscribe 콜백에서도 안전)
  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    clientRef.current = client;
  }, [client]);

  useEffect(() => {
    // 네비게이션에서 넘어온 방정보를 컨텍스트에 먼저 저장
    if (roomData) setRoom(roomData);
  }, [roomData, setRoom]);

  useEffect(() => {
    // 소켓 연결
    if (!code || !accessToken) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_BACKEND_URL}?authorization=${accessToken}`),
      reconnectDelay: 3000,
      // debug: (str) => console.log('[STOMP DEBUG]', str),
      onConnect: () => {
        setIsConnected(true);
        setClient(client);

        // 개인 메시지를 받기 위해 개인 큐 구독 (초기 방 정보 획득)
        const personalQueue = client.subscribe('/user/queue/room', (message) => {
          const body = JSON.parse(message.body);
          if (body.type === 'JOINED_ROOM') {
            const initialRoomDetails = body.data;
            setRoomDetails(initialRoomDetails);
          }
        });

        // 전체 큐 구독
        client.subscribe(`/topic/room/${code}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('📢 ============= 알립니다 ============= 📢', body);

          switch (body.type) {
            case 'PLAYER_JOINED':
              setRoomDetails((prev) => {
                const { email, name, isHost } = body.data;
                if (!prev) return prev; // 아직 초기 상태 안 들어온 경우
                // 중복 방지
                if (prev.players.some((p) => p.email === email)) return prev;

                const newPlayer = {
                  email,
                  name,
                  // picture: body.picture,
                  // 서버가 isHost 내려주면 그 값 쓰고, 없으면 hostName으로 판정
                  isHost: typeof isHost === 'boolean' ? isHost : name === prev.hostName,
                };

                const players = [newPlayer, ...prev.players];
                // console.log('PLAYER_JOINED 안에서 실행됨!!');
                return {
                  ...prev,
                  players,
                  currentPlayers: players.length,
                  canStartGame: players.length >= 2,
                };
              });
              break;
            case 'PLAYER_LEFT':
              setRoomDetails((prev) => {
                // ! 서버에 요청해서 나간사람은 이메일로 처리할 수 있도록 하기 (동명이인 가능성)
                const { name } = body.data;
                if (!prev) return prev;
                const players = prev.players.filter((p) => p.name !== name);
                return {
                  ...prev,
                  players,
                  currentPlayers: players.length,
                  canStartGame: players.length >= 2,
                };
              });
              break;
            case 'MESSAGE':
              if (body.message === '방장이 퇴장하여 방이 해체되었습니다.') {
                handleLeave();
              }
              break;
            case 'GAME_START':
              if (startedRef.current) break; // 중복 이동 방지
              startedRef.current = true;
              navigate('play', { replace: true }); // 상대 경로로 이동
              break;
            case 'QUESTION': {
              setAnswerResult(undefined);
              const { questionIndex, question, options } = body;
              setQuestion({ questionIndex, question, options }); // 새로운 문제는 덮어씌우며 최신화
              break;
            }
            case 'TIMER':
              break;
            case 'ANSWER_RESULT': {
              const { correct, correctAnswer, message, userSelectedIndex } = body;
              setAnswerResult({ correct, correctAnswer, message, userSelectedIndex });
              break;
            }
            case 'LEADERBOARD':
              break;
            case 'GAME_END':
              break;
            default:
              break;
          }
        });

        // 방에 참가 요청
        client.publish({
          destination: '/app/room/join',
          body: JSON.stringify({ inviteCode: code }),
        });

        return () => {
          // personalQueue 구독 해제
          personalQueue.unsubscribe();
        };
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [room, accessToken, setRoomDetails, code]);

  // 게임 시작
  const handleStartGame = () => {
    if (client && roomDetails) {
      client.publish({
        destination: `/app/room/${roomDetails.roomId}/start`,
        body: '',
      });
    }
  };

  // 정답 제출
  const handleAnswerSubmit = (answerIndex: number) => {
    if (client && roomDetails && question) {
      client.publish({
        destination: `/app/room/${roomDetails.roomId}/answer`,
        body: JSON.stringify({
          questionIndex: question.questionIndex,
          index: answerIndex,
        }),
      });
    }
  };

  // 퇴장
  const handleLeave = () => {
    const client = clientRef.current;

    if (client && roomDetails) {
      client.publish({
        destination: `/app/room/${roomDetails.roomId}/leave`,
        body: '',
      });
    }

    // 로컬 상태 초기화
    client?.deactivate();
    setClient(null);
    setIsConnected(false);
    setRoom(undefined);
    setRoomDetails(undefined);

    // 멀티 퀴즈 메인으로 이동
    navigate('/multi');
  };

  return (
    <div className='ds-layout-padding flex min-h-dvh w-full flex-col'>
      <BackHeader rightSlot={<LifeCounter life={50} />} to='/multi' onBeforeNavigate={handleLeave} />
      <main className='flex flex-1 flex-col py-16'>
        <Outlet context={{ handleLeave, handleStartGame, handleAnswerSubmit }} />
      </main>
    </div>
  );
}
