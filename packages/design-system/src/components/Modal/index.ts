import { ActionButton } from './ModalActionButton';
import { CloseButton } from './ModalCloseButton';
import { Content } from './ModalContent';
import { Description } from './ModalDescription';
import { Footer } from './ModalFooter';
import { Root } from './ModalRoot';
import { Title } from './ModalTitle';

/**
 * @namespace Modal
 * @description
 * 합성 컴포넌트 패턴으로 구성된 모달 UI 컴포넌트 집합입니다.
 * `Modal.Root`를 루트로 두고, 그 내부에 `Content`, `Title`, `Description`, `Footer`, 버튼들을 조합하여 사용합니다.
 *
 * ## 구조
 * - `Modal.Root` : 모달 상태(open, onClose 등)를 관리하는 루트 컴포넌트
 * - `Modal.Content` : Portal + Overlay + 컨텐츠 영역을 렌더링
 * - `Modal.Title` : 모달 제목
 * - `Modal.Description` : 모달 설명
 * - `Modal.Footer` : 액션 버튼들을 담는 컨테이너
 * - `Modal.CloseButton` : 닫기 전용 버튼 (onClose만 실행)
 * - `Modal.ActionButton` : 확인/삭제 등 액션 버튼 (onConfirm 등 실행)
 *
 * ## 예시
 * ```tsx
 * import { Modal } from '@/components/modal';
 *
 * function Example() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>모달 열기</button>
 *       <Modal.Root open={isOpen} onClose={() => setIsOpen(false)}>
 *         <Modal.Content>
 *           <Modal.Title>정말 삭제하시겠어요?</Modal.Title>
 *           <Modal.Description>삭제된 데이터는 복구할 수 없습니다.</Modal.Description>
 *           <Modal.Footer>
 *             <Modal.CloseButton>취소</Modal.CloseButton>
 *             <Modal.ActionButton>삭제</Modal.ActionButton>
 *           </Modal.Footer>
 *         </Modal.Content>
 *       </Modal.Root>
 *     </>
 *   );
 * }
 * ```
 */
export const Modal = {
  Root,
  Content,
  Title,
  Description,
  Footer,
  CloseButton,
  ActionButton,
};

export default Modal;
