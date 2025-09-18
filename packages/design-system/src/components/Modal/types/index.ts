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
