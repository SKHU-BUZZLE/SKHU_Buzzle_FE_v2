import { Button } from '@buzzle/design';
import ReviewNoteItem from '@components/ReviewNoteItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useInfiniteIncorrectNotes } from '@hooks/useReview';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewPage() {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteIncorrectNotes(10);

  // 무한 스크롤 데이터에서 편의 필드 추출
  const notes = data?.notes ?? [];

  const handleNoteClick = (noteId: number) => {
    navigate(`/review/${noteId}`);
  };

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
    <div className='mt-40 space-y-8 pb-80'>
      <h1 className='ds-typ-heading-1 ds-text-strong'>오답 노트</h1>
      <p className='ds-typ-body-1 ds-text-caption mb-32'>7문제를 풀고, 나만의 기록을 만들어보세요</p>

      <div className='space-y-2'>
        {notes.map((note) => (
          <ReviewNoteItem key={note.id} id={note.id} question={note.question} onClick={handleNoteClick} />
        ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={observerRef} className='h-1' />

        <div className='ds-layout-max-width ds-layout-padding fixed right-0 bottom-80 left-0 mx-auto'>
          <Button className='w-full rounded-2xl' onClick={() => navigate('/review-quiz')}>
            오답 퀴즈 도전하기
          </Button>
        </div>

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
