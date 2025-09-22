// pages/multi/random-matching.tsx

import { createMatchingStream, joinMatchingQueue } from '@apis/multi';
import { useAuthStore } from '@stores/auth';
import type { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RandomMatchingPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'connecting' | 'joining' | 'waiting' | 'error'>('connecting');
  const { accessToken } = useAuthStore();
  const esRef = useRef<EventSourcePolyfill | null>(null);
  const closeRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    let disposed = false;

    (async () => {
      try {
        // 1) SSE 먼저 열기
        setPhase('connecting');
        const { es, openPromise, roomIdPromise, close } = createMatchingStream(accessToken);
        esRef.current = es;
        closeRef.current = close;

        await openPromise;
        if (disposed) return;

        // 2) 큐 참가
        setPhase('joining');
        await joinMatchingQueue();
        if (disposed) return;

        // 3) roomId 받을 때까지 대기
        setPhase('waiting');
        const roomId = await roomIdPromise;
        if (disposed) return;

        // 필요 시 SSE 닫기
        closeRef.current?.();

        // 4) 로비로 이동
        navigate(`/multi-room/${roomId}/play`, {
          state: { entry: 'random', roomId },
          replace: true, // 뒤로가기 시 생성 페이지 안 보이게
        });
        // nav('/room/lobby', { replace: true, state: { entry: 'quick', roomId } });
      } catch (e) {
        console.error(e);
        if (!disposed) setPhase('error');
      }
    })();

    return () => {
      disposed = true;
      closeRef.current?.(); // 언마운트 시 닫기
    };
  }, [accessToken, navigate]);

  const handleCancel = () => {
    closeRef.current?.();
    navigate('/multi');
  };

  return (
    <section className='mx-auto max-w-640 px-16 py-32 text-center'>
      <h1 className='ds-typ-title-2'>랜덤 매칭 중…</h1>
      {phase === 'connecting' && <p className='ds-typ-body-2 mt-8'>SSE 서버와 연결 중…</p>}
      {phase === 'joining' && <p className='ds-typ-body-2 mt-8'>큐에 참여하고 있어요</p>}
      {phase === 'waiting' && <p className='ds-typ-body-2 mt-8'>상대를 찾는 중…</p>}
      {phase === 'error' && <p className='ds-typ-body-2 ds-text-danger mt-8'>매칭에 실패했어요.</p>}
      <button className='mt-24 rounded-xl border px-16 py-10' onClick={handleCancel}>
        취소
      </button>
    </section>
  );
}
