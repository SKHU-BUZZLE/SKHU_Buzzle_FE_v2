import { ChevronIcon } from '@buzzle/design';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useInfiniteIncorrectNotes } from '@hooks/useReview';
import { useCallback } from 'react';

export default function ReviewPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteIncorrectNotes(10);

  // 무한 스크롤 데이터에서 편의 필드 추출
  const notes = data?.notes ?? [];

  const observerRef = useIntersectionObserver(
    useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]),
    isFetchingNextPage,
    !hasNextPage,
  );

  if (isLoading) {
    return (
      <section className='space-y-8'>
        <h1 className='ds-typ-heading-2 ds-text-strong'>오답 노트</h1>
        <p className='ds-text-normal'>로딩 중...</p>
      </section>
    );
  }

  return (
    <div className='mt-40 space-y-8'>
      <h1 className='ds-typ-heading-1 ds-text-strong'>오답 노트</h1>
      <p className='ds-typ-body-1 ds-text-caption mb-32'>7문제를 풀고, 나만의 기록을 만들어보세요</p>

      <div className='space-y-24'>
        {notes.map((note) => (
          <div key={note.id} className='flex items-center justify-between'>
            {/* 좌측: Q 아이콘과 제목 */}
            <div className='flex min-w-0 flex-1 items-center gap-16'>
              {/* Q 아이콘 */}
              <div className='bg-primary-500/10 flex size-26 shrink-0 items-center justify-center rounded-full'>
                <span className='ds-typ-body-2 text-primary-500 font-bold'>Q</span>
              </div>

              {/* 제목 */}
              <p className='ds-typ-body-2 ds-text-normal truncate'>{note.question}</p>
            </div>

            {/* 우측: Chevron 아이콘 */}
            <ChevronIcon aria-hidden className='ds-text-caption shrink-0 rotate-180' />
          </div>
        ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={observerRef} className='h-1' />

        {/* 로딩 상태 */}
        {isFetchingNextPage && (
          <div className='py-16 text-center'>
            <p className='ds-typ-body-2 ds-text-muted'>더 많은 오답노트를 불러오는 중...</p>
          </div>
        )}

        {/* 데이터가 없을 때 */}
        {notes.length === 0 && !isLoading && (
          <div className='py-32 text-center'>
            <p className='ds-typ-body-1 ds-text-muted'>아직 오답노트가 없습니다.</p>
            <p className='ds-typ-body-2 ds-text-muted mt-8'>퀴즈를 풀고 틀린 문제들을 확인해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
