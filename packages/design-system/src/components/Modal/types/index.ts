import type { WithAsChild } from '@components/Slot';

/**
 * Button/Link 등 asChild로 변형될 수 있는 타깃을 포괄하기 위한 속성 집합.
 * - 원본 ButtonHTMLAttributes에서 onClick만 제거(Omit) 후,
 *   HTMLElement 기반의 mouse 이벤트 시그니처로 재정의합니다.
 */
type ButtonLikeAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

/**
 * @description
 * Modal Context에서 공유되는 상태와 함수들.
 * - 모든 모달 합성 컴포넌트(`Content`, `Title`, `Description`, `Footer`, 버튼 등)는
 *   이 컨텍스트를 통해 열림 상태, 닫기/확인 동작, 접근성 ID에 접근합니다.
 */
export interface ModalContextType {
  /** 모달의 열림/닫힘 상태 */
  open: boolean;
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void;
  /** 확인 버튼 클릭 시 호출되는 함수 (선택적) */
  onConfirm?: () => void;
  /** 모달 내용 영역 참조 (외부 클릭 감지용) */
  modalRef: React.RefObject<HTMLDivElement | null>;
  /** 모달 제목 영역의 접근성 ID (useId로 자동 생성됨) */
  titleId: string;
  /** 모달 설명 영역의 접근성 ID (useId로 자동 생성됨) */
  descriptionId: string;
}

/**
 * @description
 * Modal.Root 컴포넌트의 Props 정의입니다.
 * - 루트는 모달의 전역 상태(열림/닫힘), 닫기/확인 동작,
 *   그리고 ESC/외부 클릭/스크롤락 옵션을 제어합니다.
 */
export interface ModalRootProps {
  /** 모달 내부에 렌더링될 합성 컴포넌트들 */
  children: React.ReactNode;
  /** 모달의 열림/닫힘 상태 */
  open: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** 확인 버튼 클릭 시 실행되는 선택적 콜백 */
  onConfirm?: () => void;
}

/**
 * @description Modal.Content 컴포넌트의 Props
 */
export interface ModalContentProps {
  /** Modal Content 내부에 렌더링될 합성 컴포넌트들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스 (컨테이너 박스에 적용됨) */
  className?: string;
}

/**
 * @description Modal.Title 컴포넌트의 Props
 */
export interface ModalTitleProps {
  /** 제목 텍스트 혹은 React 노드 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @description Modal.Description 컴포넌트의 Props
 */
export interface ModalDescriptionProps {
  /** 설명 텍스트 혹은 React 노드 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @description Modal.Footer 컴포넌트의 Props
 */
export interface ModalFooterProps {
  /** Footer 내부에 들어갈 버튼들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * @description Modal.CloseButton 컴포넌트의 Props
 */
export interface ModalCloseButtonProps {
  /** 버튼 안에 들어갈 콘텐츠 (텍스트, 아이콘 등) */
  children: React.ReactNode;
  /** 사용자 정의 클래스명 (tailwind-merge로 병합) */
  className?: string;
}

/**
 * @description Modal.ActionButton 컴포넌트 Props
 * - `asChild`를 통해 내부를 Slot으로 감싸 다른 요소(예: <a>)에 주입할 수 있습니다.
 * - `onClick`은 HTMLElement 기반 시그니처로 통일되어 버튼/링크 모두 안전하게 수용합니다.
 */
export interface ModalActionButtonProps extends WithAsChild<ButtonLikeAttributes> {
  /** 버튼에 표시될 텍스트 또는 요소 */
  children: React.ReactNode;
  /** 사용자 정의 클래스명 (tailwind-merge로 병합) */
  className?: string;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}
