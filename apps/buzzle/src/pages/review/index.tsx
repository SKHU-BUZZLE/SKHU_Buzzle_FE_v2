import { Button } from '@buzzle/design';
import ReviewNoteItem from '@components/ReviewNoteItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useInfiniteIncorrectNotes } from '@hooks/useReview';
import { motion } from 'motion/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const cardMotion = {
  transition: { type: 'spring', stiffness: 300, damping: 20 },
  whileHover: { scale: 0.96 },
  whileTap: { scale: 0.92 },
} as const;

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
        <p className='ds-text-caption'>로딩 중...</p>
      </section>
    );
  }

  return (
    <div className='space-y-8 pb-100'>
      <h1 className='ds-typ-heading-2 ds-text-strong mt-12'>오답 노트</h1>
      <p className='ds-typ-body-2 ds-text-caption mb-32'>놓쳤던 문제를 복습하며 실력을 다져보세요</p>

      <div className='space-y-2'>
        {notes.map((note) => (
          <motion.div key={note.id} {...cardMotion}>
            <ReviewNoteItem key={note.id} id={note.id} question={note.question} onClick={handleNoteClick} />
          </motion.div>
        ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={observerRef} className='h-1' />

        {notes.length > 0 && !isLoading && (
          <div className='ds-layout-max-width ds-layout-padding ds-theme-bg-base-gradient fixed right-0 bottom-63 left-0 mx-auto py-20'>
            <Button className='w-full rounded-2xl' onClick={() => navigate('/review-quiz')}>
              오답 퀴즈 도전하기
            </Button>
          </div>
        )}

        {/* 로딩 상태 */}
        {isFetchingNextPage && (
          <div className='py-32 text-center'>
            <p className='ds-typ-body-2 ds-text-caption'>더 많은 오답노트를 불러오는 중...</p>
          </div>
        )}

        {/* 데이터가 없을 때 */}
        {notes.length === 0 && !isLoading && (
          <div className='py-60 text-center'>
            <p className='ds-typ-body-2 ds-text-caption'>아직 오답노트가 없습니다.</p>
            <p className='ds-typ-body-2 ds-text-caption mt-8'>싱글 퀴즈를 풀고 틀린 문제들을 복습해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
