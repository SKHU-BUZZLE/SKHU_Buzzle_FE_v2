import { Card } from './RadioCard';
import { Option } from './RadioOption';
import { Root } from './RadioRoot';
import { Title } from './RadioTitle';

/**
 * @description
 * Radio 합성 컴포넌트 모음입니다.
 * - Root: 라디오 그룹 컨테이너(상태/접근성 관리)
 * - Title: 그룹 제목
 * - Option: 점형 라디오 옵션
 * - Card: 카드형 라디오 옵션
 *
 * ⚠️ Option과 Card는 혼용할 수 없습니다.
 *   - Root(mode="option") → Option만 사용
 *   - Root(mode="card") → Card만 사용
 *
 * @example
 * // 점형 라디오
 * <Radio.Root value={val} onChange={setVal} mode="option" ariaLabel="밀도 선택">
 *   <Radio.Title>밀도</Radio.Title>
 *   <Radio.Option value="default">기본</Radio.Option>
 *   <Radio.Option value="comfortable">보통</Radio.Option>
 * </Radio.Root>
 *
 * @example
 * // 카드형 라디오
 * <Radio.Root
 *   value={category}
 *   onChange={setCategory}
 *   mode="card"
 *   containerClassName="grid grid-cols-3 gap-12"
 *   ariaLabel="카테고리 선택"
 * >
 *   <Radio.Title>카테고리</Radio.Title>
 *   <Radio.Card value="all" icon={<AllIcon />} label="전체" />
 *   <Radio.Card value="sports" icon={<BallIcon />} label="스포츠" />
 *   <Radio.Card value="science" icon={<ScienceIcon />} label="과학" />
 * </Radio.Root>
 */
export const Radio = {
  Root,
  Title,
  Option,
  Card,
};

export default Radio;
