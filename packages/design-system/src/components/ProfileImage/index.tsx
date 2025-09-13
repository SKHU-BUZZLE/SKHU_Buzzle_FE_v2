import { UserIcon } from '@components/icons';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * ProfileImage 컴포넌트에서 사용하는 props 정의
 *
 * - `src`: 사용자 프로필 이미지 URL (없으면 기본 아이콘 노출)
 * - `alt`: 접근성용 대체 텍스트
 * - `className`: Tailwind 유틸로 크기/테두리 등 외부에서 제어
 */
export interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export default function ProfileImage({ src, alt = '프로필 이미지', className }: ProfileImageProps) {
  const [isError, setIsError] = useState(false);

  const showFallback = !src || isError;

  return (
    <span
      aria-label={alt}
      className={twMerge(
        'bg-white-300 text-black-100 inline-flex aspect-square items-center justify-center overflow-hidden rounded-full',
        'size-32',
        className,
      )}
      role='img'
    >
      {showFallback ? (
        <UserIcon aria-hidden='true' className='size-[62.5%]' />
      ) : (
        <img
          alt={alt}
          className='h-full w-full object-cover object-center'
          decoding='async'
          loading='lazy'
          src={src}
          onError={() => setIsError(true)}
        />
      )}
    </span>
  );
}
