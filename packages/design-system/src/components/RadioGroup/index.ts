import { Card } from './RadioCard';
import { Items } from './RadioItems';
import { Option } from './RadioOption';
import { Root } from './RadioRoot';
import { Title } from './RadioTitle';

/**
 * @description
 * Radio 합성 컴포넌트 모음입니다.
 *
 * - **Root**: 라디오 그룹 컨테이너 (상태/접근성 관리, Context 제공)
 * - **Title**: 그룹 제목 (없으면 `ariaLabel`을 Root에 지정해야 함)
 * - **Items**: 옵션/카드를 묶는 컨테이너 (세로/그리드/간격 등 레이아웃 담당)
 * - **Option**: 점형 라디오 옵션
 * - **Card**: 카드형 라디오 옵션
 *
 * ⚠️ Option과 Card는 혼용할 수 없습니다.
 * - `Root(mode="option")` → `<Radio.Option>`만 사용
 * - `Root(mode="card")`   → `<Radio.Card>`만 사용
 *
 * @example
 * // 점형 라디오
 * <Radio.Root value={val} onChange={setVal} mode="option" ariaLabel="밀도 선택">
 *   <Radio.Title>밀도</Radio.Title>
 *   <Radio.Items className="flex flex-col gap-10">
 *     <Radio.Option value="default">기본</Radio.Option>
 *     <Radio.Option value="comfortable">보통</Radio.Option>
 *   </Radio.Items>
 * </Radio.Root>
 *
 * @example
 * // 카드형 라디오
 * <Radio.Root value={category} onChange={setCategory} mode="card" ariaLabel="카테고리 선택">
 *   <Radio.Title>카테고리</Radio.Title>
 *   <Radio.Items className="grid grid-cols-3 gap-12">
 *     <Radio.Card value="all" icon={<AllIcon />} label="전체" />
 *     <Radio.Card value="sports" icon={<BallIcon />} label="스포츠" />
 *     <Radio.Card value="science" icon={<ScienceIcon />} label="과학" />
 *   </Radio.Items>
 * </Radio.Root>
 */
export const Radio = {
  Root,
  Title,
  Items,
  Option,
  Card,
};

export default Radio;
