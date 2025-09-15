/**
 * @description
 * 라디오 그룹의 UI 모드입니다.
 * - 'option': 브라우저 기본 점형 라디오(UI는 사용처에서 직접 구성)
 * - 'card':   카드형 라디오(UI 기본 스타일 내장, 콘텐츠만 주입)
 */
export type RadioMode = 'option' | 'card';

/**
 * @description
 * 라디오 그룹 Context에서 관리/공유하는 상태와 함수들입니다.
 * - Option/Card 혼용 금지 체크를 위해 mode를 포함합니다.
 * - titleId는 Radio.Title과 radiogroup을 aria-labelledby로 연결하는 id입니다.
 */
export interface RadioGroupContextType {
  /** 같은 그룹을 식별하기 위한 native radio의 name 속성 */
  name: string;
  /** 현재 선택된 값 (문자열 또는 숫자) */
  value: string | number;
  /** 선택 변경 시 호출되는 콜백 */
  onChange: (next: string | number) => void;
  /** 라디오 그룹 제목 요소의 id (aria-labelledby 연결용) */
  titleId?: string;
  /** 어떤 UI 모드를 사용할지 지정 ('option' | 'card') */
  mode: RadioMode;
}
