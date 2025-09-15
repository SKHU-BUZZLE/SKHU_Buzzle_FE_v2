import ProfileImage from '@components/ProfileImage';
import { twMerge } from 'tailwind-merge';

type Variant = 'default' | 'score' | 'rank';
const VARIANT_STYLES = {
  profileImage: {
    default: 'size-52',
    score: 'size-40',
    rank: 'size-52',
  },
  name: {
    default: 'ds-typ-body-2 ds-text-normal',
    score: 'ds-typ-body-2 ds-text-normal font-bold',
    rank: 'ds-typ-body-2 ds-text-normal',
  },
  meta: {
    score: 'ds-typ-body-2 ds-text-caption',
    rank: 'ds-text-strong ds-typ-title-2',
  } satisfies Record<Exclude<Variant, 'default'>, string>,
  metaUnit: {
    score: '점',
    rank: '등',
  } satisfies Record<Exclude<Variant, 'default'>, string>,
} as const;

interface AvatarProps {
  /** 아바타의 표시 스타일 결정 (default / score / rank) */
  variant?: Variant;
  /** 프로필 이미지 src */
  src?: string;
  /** 표시할 이름 */
  name: string;
  /** 프로필 이미지 대체 텍스트(미지정 시 name 기반 생성) */
  alt?: string;
  /** 점수 또는 순위 값 */
  metaValue?: number;
  /** 이름/메타 정보의 배치 방향 */
  direction?: 'horizontal' | 'vertical';
  /** 루트 컨테이너 스타일 확장용 className */
  layoutClassName?: string;
  /** 프로필 이미지 스타일 확장용 className */
  profileImageClassName?: string;
  /** 이름 스타일 확장용 className */
  nameClassName?: string;
  /** 메타 정보 스타일 확장용 className */
  metaClassName?: string;
}

/**
 * Avatar 컴포넌트
 *
 * 프로필 이미지와 이름, 선택적으로 점수(score)나 순위(rank) 같은 메타 정보를 표시합니다.
 * `variant`에 따라 스타일과 메타 단위(`점`, `등`)가 달라집니다.
 *
 * @param {('default' | 'score' | 'rank')} [props.variant='default']
 * 아바타의 표시 스타일을 결정합니다.
 * - `default`: 기본 프로필
 * - `score`: 점수 표시용
 * - `rank`: 순위 표시용
 * @param {string} [props.src] 프로필 이미지 src입니다.
 * @param {string} [props.alt] 프로필 이미지 대체 텍스트입니다.
 * @param {string} props.name 표시할 이름입니다. (필수)
 * @param {number} [props.metaValue] 점수 또는 순위 값입니다.
 * `variant`가 `score` 또는 `rank`일 때만 표시됩니다.
 * @param {('horizontal' | 'vertical')} [props.direction='vertical']
 * 이름/메타 정보의 배치 방향입니다.
 * - `vertical`: 이미지 아래에 표시
 * - `horizontal`: 이미지 옆에 표시
 * @param {string} [props.layoutClassName] 루트 컨테이너에 추가할 Tailwind 클래스입니다.
 * @param {string} [props.profileImageClassName] 프로필 이미지에 추가할 Tailwind 클래스입니다.
 * @param {string} [props.nameClassName] 이름 텍스트에 추가할 Tailwind 클래스입니다.
 * @param {string} [props.metaClassName] 메타 텍스트에 추가할 Tailwind 클래스입니다.
 *
 * @example
 * 1) 기본 아바타
 * <Avatar name="홍길동" src="/profile.png" />
 *
 * @example
 * 2) 점수 아바타
 * <Avatar direction='horizontal' variant="score" name="홍길동" metaValue={85} src="/profile.png" />
 *
 * @example
 * 3) 순위 아바타
 * <Avatar direction='horizontal' variant="rank" name="홍길동" metaValue={1} src="/profile.png" />
 */
export default function Avatar({
  variant = 'default',
  src,
  alt,
  name,
  metaValue,
  direction = 'vertical',
  layoutClassName,
  profileImageClassName,
  nameClassName,
  metaClassName,
}: AvatarProps) {
  const altText = alt ?? `${name}의 프로필 이미지`;
  const metaUnit = variant === 'default' ? '' : VARIANT_STYLES.metaUnit[variant];
  const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';
  const gap = variant === 'rank' ? 'gap-20' : 'gap-12';

  return (
    <div className={twMerge(`flex w-fit items-center`, flexDirection, gap, layoutClassName)}>
      <ProfileImage
        alt={altText}
        className={twMerge(VARIANT_STYLES.profileImage[variant], profileImageClassName)}
        src={src}
      />

      <div className={twMerge('flex flex-col items-start gap-2', direction === 'vertical' && 'items-center')}>
        <p className={twMerge(VARIANT_STYLES.name[variant], nameClassName)}>{name}</p>

        {variant !== 'default' && typeof metaValue === 'number' && metaValue > -1 && (
          <p className={twMerge(VARIANT_STYLES.meta[variant], metaClassName)}>
            {metaValue}
            {metaUnit}
          </p>
        )}
      </div>
    </div>
  );
}
