interface QuizIntroProps {
  src: string;
  title: string;
  subtitle: string;
  guidelines?: string[];
}

/**
 * QuizIntro
 * - 퀴즈 시작 전 보여줄 인트로 컴포넌트입니다.
 * - 이미지, 제목, 부제, 규칙 리스트를 포함합니다.
 *
 * @param {string} props.src 퀴즈 소개 이미지 경로 (webp 등 정적 파일 import 가능)
 * @param {string} props.title 퀴즈 제목 / alt 속성은 title을 기반으로 자동 생성
 * @param {string} props.subtitle 퀴즈 부제/설명
 * @param {string[]} [props.guidelines] 퀴즈 규칙이나 안내 문구 리스트 (각 항목은 `<li>`로 렌더링)
 *
 * @example
 * ```tsx
 * <QuizIntro
 *   src={multiQuizGuide}
 *   title="혼자서 즐기는 상식 퀴즈"
 *   subtitle="7문제를 풀고 기록을 세워보세요"
 *   guidelines={[
 *     "총 7문제가 주어집니다.",
 *     "문제당 제한 시간은 10초입니다.",
 *   ]}
 * />
 * ```
 */
export default function QuizIntro({ src, title, subtitle, guidelines }: QuizIntroProps) {
  return (
    <div className='flex flex-col gap-36'>
      <img
        alt={title ? `${title} 안내 이미지` : '퀴즈 안내 이미지'}
        className='aspect-square size-58 object-contain'
        src={src}
      />

      <div className='flex flex-col gap-6'>
        <h1 className='ds-typ-heading-3 ds-text-strong'>{title}</h1>
        <h2 className='ds-typ-body-1 ds-text-caption'>{subtitle}</h2>
      </div>

      <ul className='ds-typ-body-2 ds-text-normal ml-16 flex list-disc flex-col items-start gap-4'>
        {guidelines?.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
