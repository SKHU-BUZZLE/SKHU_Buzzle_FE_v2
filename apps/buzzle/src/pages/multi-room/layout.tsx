import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '@stores/auth';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SockJS from 'sockjs-client';

export default function MultiRoomLayout() {
  const { accessToken } = useAuthStore();

  useEffect(() => {
    // 실제 백엔드 주소에 맞게 수정
    const client = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WEBSOCKET_BACKEND_URL}?authorization=${accessToken}`),
      debug: (str) => console.log('[STOMP DEBUG]', str),
      reconnectDelay: 5000, // 끊겼을 때 재연결
      onConnect: () => {
        console.log('✅ WebSocket 연결 성공!');
        console.log(client);
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 오류:', frame.headers['message']);
      },
      onWebSocketError: (event) => {
        console.error('❌ WebSocket 오류:', event);
      },
    });

    client.activate();

    // cleanup (컴포넌트 언마운트 시 연결 해제)
    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div className='ds-layout-padding flex min-h-dvh w-full flex-col'>
      <BackHeader rightSlot={<LifeCounter life={50} />} to='/home' />
      {/* Outlet 영역이 화면을 다 채우기 위해서 flex-1을 사용 / 여백을 위한 py 설정 */}
      <main className='flex flex-1 flex-col py-16'>
        <Outlet />
      </main>
    </div>
  );
}
