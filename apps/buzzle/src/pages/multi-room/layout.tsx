import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '@stores/auth';
import { RoomProvider, useRoom } from '@stores/room';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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
    <div className='ds-layout-padding flex min-h-dvh w-full flex-col'>
      <BackHeader rightSlot={<LifeCounter life={50} />} to='/home' />
      <RoomProvider /* (선택) initialRoom={roomData} 로 확장 가능 */>
        <MultiRoomBody roomData={roomData} />
      </RoomProvider>
    </div>
  );
}

export function MultiRoomBody({ roomData }: { roomData?: Room }) {
  const { room, setRoom, setRoomDetails } = useRoom();
  const { accessToken } = useAuthStore();

  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    // 네비게이션에서 넘어온 방정보를 컨텍스트에 먼저 저장
    if (roomData) setRoom(roomData);
  }, [roomData, setRoom]);

  useEffect(() => {
    // 소켓 연결
    if (!room || !accessToken) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_BACKEND_URL}?authorization=${accessToken}`),
      reconnectDelay: 3000,
      debug: (str) => console.log('[STOMP DEBUG]', str),
      onConnect: () => {
        setIsConnected(true);
        setClient(client);
        // console.log('✅ WebSocket 연결 성공!', client);

        // 개인 메시지를 받기 위해 개인 큐 구독 (초기 방 정보 획득)
        const personalQueue = client.subscribe('/user/queue/room', (message) => {
          const body = JSON.parse(message.body);
          if (body.type === 'JOINED_ROOM') {
            const initialRoomDetails = body.data;
            setRoomDetails(initialRoomDetails);
            // console.log('초기 방 정보: ', initialRoomDetails);
          }
        });

        // 방에 참가 요청
        client.publish({
          destination: '/app/room/join',
          body: JSON.stringify({ inviteCode: room.inviteCode }),
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
  }, [room, accessToken, setRoomDetails]);

  return (
    <main className='flex flex-1 flex-col py-16'>
      <Outlet />
    </main>
  );
}
