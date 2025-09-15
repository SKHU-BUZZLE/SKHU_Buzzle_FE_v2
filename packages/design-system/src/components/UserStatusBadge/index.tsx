import { twMerge } from 'tailwind-merge';

export interface UserStatusBadgeProps {
  /** 왼쪽에 표시할 아이콘 (없으면 렌더링 안 함) */
  icon?: React.ReactNode;
  /** 중앙 문구 (필수) */
  label: string;
  /** 오른쪽 강조 값 (필수) */
  value: number | string;
  /** 값 뒤에 붙는 접미사/단위 (예: "위", "일") */
  valueSuffix?: string;
  /** 외부 Tailwind 스타일 덮어쓰기 */
  className?: string;
}

const baseContainer =
  'inline-flex items-center gap-8 rounded-full px-12 py-8 h-32 w-fit ' +
  'bg-white-50 dark:bg-dm-black-700 ' +
  'ds-text-normal ds-typ-body-3';

/**
 * UserStatusBadge 컴포넌트
 *
 * 좌측 아이콘, 중앙 라벨, 우측 강조 값(선택 접미사 포함)으로 구성된 뱃지 형태의 컴포넌트입니다.
 * 접근성을 위해 `aria-label`이 자동으로 생성되어, 라벨과 값이 하나의 문장으로 스크린리더에 읽힙니다.
 * 다크 모드에서는 `dark:bg-dm-black-700` 색상 토큰을 사용합니다.
 *
 * @param {React.ReactNode} [props.icon] 왼쪽에 표시할 아이콘입니다. (없으면 렌더링하지 않음)
 * @param {string} props.label 중앙에 표시할 문구입니다. (필수)
 * @param {number|string} props.value 오른쪽에 강조되는 값입니다. (필수)
 * @param {string} [props.valueSuffix] 값 뒤에 붙는 접미사/단위입니다. (예: `"위"`, `"일"`)
 * @param {string} [props.className] 루트 컨테이너에 추가할 Tailwind 클래스입니다.
 *
 * @example
 * 1) 기본 사용
 * <UserStatusBadge label="현재 순위" value={3} valueSuffix="위" />
 *
 * @example
 * 2) 아이콘 포함
 * import { CalendarIcon } from '@components/icons';
 * <UserStatusBadge icon={<CalendarIcon />} label="버즐과 함께" value={15} valueSuffix="일" />
 *
 * @example
 * 3) 스타일 커스터마이즈
 * <UserStatusBadge className="bg-primary-50 text-primary-700" label="내 점수" value={99} valueSuffix="점" />
 */
export default function UserStatusBadge({ icon, label, value, valueSuffix, className }: UserStatusBadgeProps) {
  const aria = `${label} ${value}${valueSuffix ?? ''}`;

  return (
    <div aria-label={aria} className={twMerge(baseContainer, className)}>
      {icon ? (
        <span aria-hidden='true' className='size-14'>
          {icon}
        </span>
      ) : null}

      <span className='truncate'>{label}</span>

      <span className='text-primary-500 max-w-[10ch] truncate font-bold'>
        {value}
        {valueSuffix}
      </span>
    </div>
  );
}
