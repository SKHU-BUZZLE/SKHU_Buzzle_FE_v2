import { Button, DeleteIcon, Modal, QuizOption } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { useDeleteIncorrectNote, useIncorrectNoteDetail } from '@hooks/useReview';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const quizResultId = Number(id);

  // 상세 조회
  const { data: detail, isLoading, error } = useIncorrectNoteDetail(quizResultId);

  // 삭제 mutation
  const deleteMutation = useDeleteIncorrectNote();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync(quizResultId);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className='space-y-8'>
        <BackHeader rightSlot={<span className='ds-typ-body-2 ds-text-muted' />} to='/review' />
        <div className='py-40 text-center'>
          <p className='ds-text-caption'>문제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className='space-y-8'>
        <BackHeader rightSlot={<span className='ds-typ-body-2 ds-text-muted'>삭제</span>} to='/review' />
        <div className='py-40 text-center'>
          <p className='ds-text-muted'>문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  const options = [
    { text: detail.option1, index: 1 },
    { text: detail.option2, index: 2 },
    { text: detail.option3, index: 3 },
    { text: detail.option4, index: 4 },
  ];

  const correctIndex = Number(detail.correctAnswer);

  return (
    <div className='space-y-8'>
      <BackHeader
        rightSlot={
          <Button
            iconOnly
            disabled={isDeleting}
            leftIcon={<DeleteIcon className='ds-text-caption' />}
            size='sm'
            variant='ghost'
            onClick={handleDeleteClick}
          />
        }
        to='/review'
      />

      <div className='mt-24 space-y-36'>
        {/* 문제 */}
        <h1 className='ds-typ-heading-3 ds-text-strong'>
          <span className='ds-text-caption'>Q. </span>
          {detail.question}
        </h1>

        {/* 선택지들 */}
        <div className='space-y-16'>
          {options.map((option) => (
            <QuizOption
              key={option.index}
              index={option.index}
              isCorrect={option.index === correctIndex}
              option={option.text}
            />
          ))}
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <Modal.Root open={isDeleteModalOpen} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm}>
        <Modal.Content className='max-w-360'>
          <Modal.Title>오답노트에서 문제를 삭제합니다</Modal.Title>
          <Modal.Description>삭제는 되돌릴 수 없어요</Modal.Description>

          <Modal.Footer>
            <Modal.CloseButton>취소</Modal.CloseButton>
            <Modal.ActionButton disabled={isDeleting}>{isDeleting ? '삭제 중...' : '삭제'}</Modal.ActionButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}
