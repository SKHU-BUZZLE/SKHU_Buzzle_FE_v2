import { LoaderIcon } from '@components/icons';
import { Children, isValidElement, type JSXElementConstructor, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function getValidChildren(children: React.ReactNode) {
  const childrenArray = Children.toArray(children);

  return childrenArray.filter((child) => {
    // 기본 string 허용
    if (typeof child === 'string') return true;
    // span, p 태그 허용
    if (isValidElement(child) && (child.type === 'span' || child.type === 'p')) {
      return true;
    }

    return false;
  });
}

function isValidIcon(node: React.ReactNode) {
  if (!isValidElement(node)) return false;

  // node.type 은 string(태그) 또는 컴포넌트 타입일 수 있음
  if (typeof node.type === 'string') return false;

  // 함수/클래스 컴포넌트 타입으로 좁히기
  const type = node.type as JSXElementConstructor<unknown> & { displayName?: string };

  const displayName = type.displayName ?? type.name;
  return typeof displayName === 'string' && displayName.includes('Icon');
}

const VARIANT_STYLES = {
  size: {
    lg: 'w-370 py-16 ds-typ-body-1',
    md: 'w-200 py-14 ds-typ-body-2 ',
    sm: 'w-140 py-10 ds-typ-body-2',
  },
  round: {
    rounded: 'rounded-xl',
    circular: 'rounded-[999px]',
    square: '',
  },
  variant: {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-primary-alpha-10 dark:bg-primary-alpha-20 text-primary-500',
    outline: 'border ds-theme-bg-base ds-theme-border-base',
    ghost: 'ds-theme-bg-base',
    danger: 'bg-error-red-500 text-white',
  },
  loader: {
    primary: 'text-white',
    secondary: 'text-primary-500',
    outline: 'ds-text-normal',
    ghost: 'ds-text-normal',
    danger: 'text-white',
  },
  loaderSize: {
    lg: 'size-[0.875rem] md:size-[1rem]',
    md: 'size-[0.75rem] md:size-[0.875rem]',
    sm: 'size-[0.75rem] md:size-[0.875rem]',
  },
};

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled' | 'className' | 'ref'> {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  ref?: React.Ref<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  size?: 'lg' | 'md' | 'sm';
  round?: 'rounded' | 'circular' | 'square';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconProps?: React.SVGProps<SVGSVGElement>;
  className?: string;
}

export default function Button({
  loading = false,
  disabled = false,
  type = 'button',
  variant = 'primary',
  ref,
  children,
  onClick,
  round = 'rounded',
  size = 'lg',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconProps,
  className,
  ...props
}: ButtonProps) {
  const [cooldown, setCooldown] = useState(false); // 클릭 쿨타임

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading || cooldown) {
      e.preventDefault();
      return;
    }
    setCooldown(true);
    setTimeout(() => setCooldown(false), 500); // 0.5초 동안 연타 막기

    onClick?.();
  };

  // children에서 텍스트만 필터링
  const validChildren = getValidChildren(children);

  // leftIcon과 rightIcon에서 icon만 필터링 (컴포넌트로 사용할거라 대문자로 시작)
  const ValidLeftIcon = isValidIcon(LeftIcon) ? LeftIcon : null;
  const ValidRightIcon = isValidIcon(RightIcon) ? RightIcon : null;

  // 기본 버튼 스타일 (disabled / hover / active 스타일 포함)
  const buttonClassNames = twMerge(
    'w-fit flex gap-8 flex-shrink-0 justify-center items-center leading-none cursor-pointer p-4',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'enabled:hover:opacity-85 enabled:active:brightness-80',
    size ? VARIANT_STYLES.size[size] : '',
    variant ? VARIANT_STYLES.variant[variant] : 'border-none',
    round ? VARIANT_STYLES.round[round] : '',
  );

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      type={type}
      onClick={handleClick}
      {...props}
      className={twMerge(buttonClassNames, className)}
    >
      {ValidLeftIcon && <span className='flex shrink-0 items-center justify-center'>{ValidLeftIcon}</span>}
      {loading ? (
        <LoaderIcon
          className={twMerge('animate-spin', VARIANT_STYLES.loader[variant], VARIANT_STYLES.loaderSize[size])}
        />
      ) : (
        validChildren
      )}
      {ValidRightIcon && <span className='flex shrink-0 items-center justify-center'>{ValidRightIcon}</span>}
    </button>
  );
}
