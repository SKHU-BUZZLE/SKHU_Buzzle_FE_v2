import { createMatchingStream, joinMatchingQueue } from '@apis/multi';
import multiMatchingLoading from '@assets/images/multi-matching-loading.webp';
import { Button } from '@buzzle/design';
import { useAuthStore } from '@stores/auth';
import type { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const messages = {
  connecting: {
    title: '서버에 연결하는 중이에요',
    description: '퀴즈 대결을 위한 준비를 하고 있어요.',
  },
  joining: {
    title: '매칭 대기열에 참여했어요',
    description: '비슷한 실력의 상대를 찾고 있어요.',
  },
  waiting: {
    title: '상대를 찾고 있어요',
    description: '재밌는 퀴즈 대결이 곧 시작돼요!',
  },
  error: {
    title: '매칭에 실패했어요',
    description: '네트워크 상태를 확인하시고 다시 시도해주세요.',
  },
};

export default function RandomMatchingPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'connecting' | 'joining' | 'waiting' | 'error'>('connecting');
  const { title, description } = messages[phase];
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
    <div className='flex min-h-0 flex-1 flex-col items-center gap-36'>
      <div className='flex flex-1 flex-col items-center justify-center gap-12'>
        <img alt='랜덤 매칭 아이콘' className='mb-20 size-200 object-contain' src={multiMatchingLoading} />
        <h1 className='ds-typ-title-1'>{title}</h1>
        <p className='ds-typ-body-2 ds-text-caption'>{description}</p>
      </div>
      <Button className='mt-auto w-full' variant='outline' onClick={handleCancel}>
        취소하기
      </Button>
    </div>
  );
}
