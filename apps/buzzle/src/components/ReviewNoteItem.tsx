import { ChevronIcon } from '@buzzle/design';

interface ReviewNoteItemProps {
  id: number;
  question: string;
  onClick: (id: number) => void;
}

export default function ReviewNoteItem({ id, question, onClick }: ReviewNoteItemProps) {
  return (
    <button
      className='flex w-full cursor-pointer items-center justify-between py-16 text-left'
      type='button'
      onClick={() => onClick(id)}
    >
      <div className='flex min-w-0 flex-1 items-center gap-16'>
        {/* Q 아이콘 */}
        <div className='bg-primary-500/10 flex size-26 shrink-0 items-center justify-center rounded-full'>
          <span className='ds-typ-body-2 text-primary-500 font-bold'>Q</span>
        </div>

        {/* 제목 */}
        <p className='ds-typ-body-2 ds-text-normal truncate'>{question}</p>
      </div>

      {/* 우측: Chevron 아이콘 */}
      <ChevronIcon aria-hidden className='ds-text-caption shrink-0 rotate-180' />
    </button>
  );
}
