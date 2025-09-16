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
  /** 제목이 없을 때 접근성 이름으로 사용되는 라벨(권장) */
  ariaLabel?: string;
  /** Radio 내부에 렌더링될 컴포넌트들 */
  children: React.ReactNode;
}

/**
 * @description 라디오 Title 컴포넌트 Props (aria-labelledby로 그룹 이름을 연결하는 시각/접근성 제목)
 */
export interface RadioTitleProps {
  /** 제목 콘텐츠(텍스트/아이콘 등) */
  children?: React.ReactNode;
  /** 제목 요소의 추가 클래스 */
  className?: string;
}

/**
 * @description
 * 점형 라디오 Option 컴포넌트 Props입니다.
 * - 브라우저 기본 라디오 UI를 사용하며, children으로 라벨/아이콘을 자유롭게 구성할 수 있습니다.
 */
export interface RadioOptionProps {
  /** 이 옵션의 값 */
  value: string | number;
  /** 라벨/아이콘 등 자유 구성 */
  children?: React.ReactNode;
  /** 옵션 래퍼(label) 클래스 */
  className?: string;
  /** native input에 직접 적용할 클래스 (크기/색: accent-*, size-*) */
  inputClassName?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * @description
 * 카드형 라디오 Card 컴포넌트 Props입니다.
 * - 아이콘/라벨을 세로 중앙 정렬 + gap-4로 자동 배치합니다.
 * - icon과 label 중 원하는 것만 넘길 수 있으며, 일관된 카드 디자인을 보장합니다.
 */
/** 카드형 라디오 Card 컴포넌트 Props */
export interface RadioCardProps {
  /** 이 옵션의 값 */
  value: string | number;
  /** 아이콘 노드(없으면 아이콘 영역 미표시) */
  icon?: React.ReactNode;
  /** 텍스트 라벨(없으면 라벨 영역 미표시) */
  label?: React.ReactNode;
  /** 카드 컨테이너 클래스 */
  className?: string;
  /** 비활성화 여부(옵션) */
  disabled?: boolean;
}

/** 옵션/카드 컨테이너 슬롯 Props */
export interface RadioItemsProps {
  /** 레이아웃(그리드/간격) 제어 */
  className?: string;
  /** 내부에 렌더링될 옵션/카드 컴포넌트들 */
  children?: React.ReactNode;
}
