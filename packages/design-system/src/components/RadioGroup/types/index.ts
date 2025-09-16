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

/**
 * @description
 * 라디오 Root 컴포넌트의 Props입니다.
 * Root는 상태/접근성 컨텍스트를 제공하고, children으로 UI 컴포넌트를 조합합니다.
 * 외곽 스타일(className)과 자식 배치(containerClassName)는 Root에서 제어할 수 있습니다.
 */
export interface RadioRootProps {
  /** 현재 선택 값 */
  value: string | number;
  /** 선택 변경 콜백 */
  onChange: (next: string | number) => void;
  /** UI 모드 ('option' | 'card'): Option/Card 혼용 방지용 */
  mode: RadioMode;
  /** 같은 페이지에서 그룹 간 이름 충돌 방지용 name (미지정 시 자동 생성) */
  name?: string;
  /** 루트 외곽 래퍼 클래스 (섹션 여백/배경/테두리 등) */
  className?: string;
  /** 자식 항목 컨테이너 클래스 (세로/가로/그리드/간격 등 배치 제어) */
  containerClassName?: string;
  /** 제목이 없을 때 접근성 이름으로 사용되는 라벨(권장) */
  ariaLabel?: string;
  /** Radio 내부에 렌더링될 컴포넌트들 */
  children: React.ReactNode;
}
