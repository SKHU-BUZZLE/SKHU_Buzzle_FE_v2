import { Children, cloneElement, isValidElement } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

/**
 * @module Slot (asChild 패턴)
 *
 * 부모가 자식 ReactElement(이미 존재하는 버튼/링크 등)에 props(이벤트/클래스/스타일/aria/data-*)를
 * **DOM 래퍼 없이 주입**하고 싶을 때 사용하는 패턴입니다. (중첩 버튼/링크 방지)
 *
 * 📌 기본 정책
 * - 기본: children 중 **첫 번째 유효한 ReactElement**를 자동 타깃으로 선정해 props 병합
 * - 옵션: 특정 타깃을 직접 지정해야 하면 <Slottable>로 **명시적 타깃** 지정 (escape hatch)
 *
 * 🧩 병합 규칙(mergeProps)
 * - 이벤트: child → slot 순서 실행 (자식 의도 우선), child가 `preventDefault()` 하면 slot 실행 생략
 * - className: twJoin 후 twMerge로 Tailwind **중복/충돌 정리**
 * - style: slot → child 얕은 병합(최종 child 우선)
 * - ref  : child, slot 모두 보존(mergeRefs)
 *
 * ⚠️ 주의
 * - 자동 타깃 모드에서는 **유효한 ReactElement를 하나**만 두는 것을 권장합니다.
 *   복잡한 트리에서는 <Slottable>을 사용해 타깃을 명시하세요.
 */

/**
 * @typedef ExtendedHTMLAttributes
 * @description
 * - HTMLElement의 표준 HTML 속성에 더해, 임의의 키를 허용하는 인덱스 시그니처를 추가한 타입입니다.
 * - Slot은 범용적으로 다양한 prop(aria-*, data-* 포함)을 자식에게 주입할 수 있어야 하므로 유연하게 설계합니다.
 */
interface ExtendedHTMLAttributes extends React.HTMLAttributes<HTMLElement> {
  [key: string]: unknown;
}

/**
 * @typedef SlotProps
 * @description
 * Slot 컴포넌트의 props입니다.
 *
 * @property {React.ReactNode} children
 *   - Slot이 감쌀 자식 노드입니다.
 *   - 자동 타깃 모드에서는 이 중 **첫 번째 유효한 ReactElement**가 병합 타깃으로 선택됩니다.
 *
 * @property {React.Ref<HTMLElement>} [ref]
 *   - React 19의 ref-as-prop 모델과 호환됩니다.
 *   - Slot은 DOM 래퍼를 만들지 않으므로, **병합 타깃 엘리먼트**에 연결됩니다.
 */
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

/**
 * @typedef EventHandler
 * @description
 * 범용 이벤트 핸들러 시그니처입니다. (onClick, onKeyDown 등)
 * Slot은 unknown 인자 시그니처를 사용해 다양한 이벤트 환경(마우스/키보드/커스텀)을 포괄합니다.
 */
interface EventHandler {
  (...args: unknown[]): void;
}

/**
 * @typedef WithAsChild<T>
 * @description
 * asChild 패턴을 지원하는 컴포넌트의 prop 타입에 혼합하여 사용합니다.
 * `asChild?: boolean`이 true면 내부에서 Slot을 사용해 DOM 래퍼 없이 props를 주입합니다.
 */
export type WithAsChild<T> = T & { asChild?: boolean };

/**
 * mergeRefs
 *
 * @description
 * 여러 ref(함수 ref/객체 ref)를 **하나의 ref 콜백**으로 병합합니다.
 * 부모와 자식 모두 ref를 필요로 할 때, 서로의 ref를 덮어쓰지 않고 공존하도록 도와줍니다.
 *
 * @template T HTMLElement 타입 (기본값: HTMLElement)
 * @param {...Array<React.Ref<T> | undefined>} refs - 병합할 ref들의 배열 (함수 ref와 {current} ref 모두 가능)
 * @returns {React.RefCallback<T>} - 입력된 모든 ref에 값을 전달하는 단일 ref 콜백
 */
function mergeRefs<T = HTMLElement>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value: T | null) => {
    // forEach: 전달된 모든 ref에 동일한 DOM 노드를 전달
    refs.forEach((ref) => {
      // CASE 1) 함수 ref인 경우: 콜백 호출
      if (typeof ref === 'function') {
        ref(value);
      }
      // CASE 2) 객체 ref인 경우: current에 할당
      else if (ref != null && 'current' in ref) {
        ref.current = value;
      }
      // CASE 3) undefined/null: 무시
    });
  };
}

/**
 * mergeProps (키 유니온 기반 병합)
 *
 * @description
 * Slot의 props와 타깃 엘리먼트의 props를 **명시적 규칙**에 따라 병합합니다.
 *
 * - 1단계: 두 객체의 모든 키를 합쳐(allKeys) 순회
 * - 2단계: 키별 규칙 적용
 *   - onX 핸들러: child → slot 순서로 호출. child가 preventDefault() 시 slot 생략
 *   - className : twJoin 후 twMerge로 Tailwind 충돌/중복 정리
 *   - style     : slot → child 얕은 병합(최종 child 우선)
 *   - ref       : 마지막에 mergeRefs
 *   - 기타      : child 우선, 단 **child 값이 undefined**면 slot-only prop을 보존
 *
 * @param {ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> }} slotProps
 *   Slot(부모)에서 전달한 props. (주입하고자 하는 속성)
 * @param {ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> }} childProps
 *   병합 타깃(자식 엘리먼트)의 기존 props. (원래 가지고 있던 속성)
 * @returns {ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> }}
 *   병합된 props. (이벤트/클래스/스타일/ref 규칙 적용)
 */
function mergeProps(
  slotProps: ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
  childProps: ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
): ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> } {
  // result: 기본적으로 childProps를 복사 (기본 원칙: 자식 우선)
  const result: ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> } = { ...childProps };

  // 레코드 접근을 위해 캐스팅
  const slotRec = slotProps as Record<string, unknown>;
  const childRec = childProps as Record<string, unknown>;

  // allKeys: 두 객체의 모든 키를 합침
  const allKeys = new Set([...Object.keys(childRec), ...Object.keys(slotRec)]);

  // 각 키별로 병합 규칙 적용
  for (const key of allKeys) {
    // CASE: ref는 마지막에 일괄 병합 (중간에 섞으면 꼬일 수 있음)
    if (key === 'ref') continue;

    const childVal = childRec[key];
    const slotVal = slotRec[key];

    const isHandlerKey = /^on[A-Z]/.test(key); // on으로 시작 + 다음 문자가 대문자면 핸들러 추정
    const childIsFn = typeof childVal === 'function';
    const slotIsFn = typeof slotVal === 'function';

    // CASE: 이벤트 핸들러
    if (isHandlerKey && (childIsFn || slotIsFn)) {
      // 둘 다 있으면 child → slot 순서로 실행
      if (childIsFn && slotIsFn) {
        result[key] = (...args: unknown[]) => {
          // 1) child 먼저 실행
          (childVal as EventHandler)(...args);

          // 2) child가 preventDefault 했다면 slot 생략 (안전성 확보)
          const ev = args[0] as { defaultPrevented?: boolean } | undefined;
          if (ev && ev.defaultPrevented) return;

          // 3) slot 실행
          (slotVal as EventHandler)(...args);
        };
      }
      // child만 있으면 child 유지
      else if (childIsFn) {
        result[key] = childVal as EventHandler;
      }
      // slot만 있으면 slot 부여
      else if (slotIsFn) {
        result[key] = slotVal as EventHandler;
      }
      // → 다음 키로
      continue;
    }

    // CASE: className 병합 (Tailwind 유틸 충돌/중복 정리)
    if (key === 'className') {
      // twJoin: 공백/조건부를 정리하여 안전한 문자열로 결합
      // twMerge: Tailwind 규칙에 따라 충돌 유틸을 정리 (나중 값 우선)
      const merged = twMerge(twJoin(String(childVal ?? ''), String(slotVal ?? '')));
      result[key] = merged;
      continue;
    }

    // CASE: style 병합 (slot → child 얕은 병합: 최종적으로 child 스타일이 우선)
    if (key === 'style') {
      result[key] = {
        ...(slotVal as React.CSSProperties),
        ...(childVal as React.CSSProperties),
      };
      continue;
    }

    // CASE: 기타 prop
    // - 기본은 child 우선 (result가 child 기반)
    // - 단, childVal이 undefined이고 slotVal이 정의되어 있으면 slot-only prop 보존
    if (childVal === undefined && slotVal !== undefined) {
      result[key] = slotVal as unknown;
    }
    // childVal이 정의되어 있으면 이미 result에 있으므로 그대로 둠
  }

  // CASE: ref 병합 (마지막 처리 권장)
  const slotRef = slotProps.ref;
  const childRef = childProps.ref;
  if (slotRef || childRef) {
    result.ref = mergeRefs(childRef, slotRef);
  }

  return result;
}

/**
 * @component Slottable
 * @description
 * 자동 타깃이 애매하거나 복잡한 트리에서 **명시적으로 타깃을 지정**하고 싶을 때 사용하는 escape hatch입니다.
 * `<Slottable>{ 실제 병합 타깃 }</Slottable>` 형태로 감싸면,
 * Slot은 이 내부의 **직계 자식**을 병합 타깃으로 승격(unwrap & hoist)합니다.
 *
 * @example
 * <Slot onClick={...}>
 *   <div>설명</div>
 *   <Slottable>
 *     <a href="/docs" onClick={(e) => e.preventDefault()}>문서</a>
 *   </Slottable>
 * </Slot>
 * // 여기서는 <a>가 병합 타깃이 됩니다.
 */
export interface SlottableProps {
  children: React.ReactNode;
}

export const Slottable = ({ children }: SlottableProps) => {
  return children;
};

/**
 * @component Slot
 * @description
 * - 기본: children 중 **첫 번째 유효 ReactElement**를 자동 타깃으로 선정해 props 병합
 * - 옵션: <Slottable>로 감싼 경우, 그 **직계 자식**을 병합 타깃으로 승격(unwrap & hoist)
 *
 * @param {React.ReactNode} children
 *   자동 타깃 모드에서는 첫 번째 유효 ReactElement가 병합 타깃으로 선택됩니다.
 * @param {React.HTMLAttributes<HTMLElement>} props
 *   전달할 HTML 속성들(onClick, className, style, aria-*, data-* 등)
 *
 * @example 자동 타깃(기본)
 * <Slot onClick={() => console.log('slot')}>
 *   <button onClick={() => console.log('child')}>열기</button>
 * </Slot>
 * // console: child → slot
 *
 * @example Slottable로 명시적 타깃 지정
 * <Slot className="px-4">
 *   <p>설명</p>
 *   <Slottable>
 *     <a href="/docs" onClick={(e) => e.preventDefault()}>문서</a>
 *   </Slottable>
 * </Slot>
 * // preventDefault로 child가 기본 동작을 막으면 slot의 onClick은 생략
 */
export const Slot = ({ children, ref, ...props }: SlotProps) => {
  // children을 배열로 정규화
  const arr = Children.toArray(children);

  // 1) Slottable이 있다면, 그 내부의 "직계 자식"을 병합 타깃으로 사용
  const slottable = arr.find((child) => isValidElement(child) && child.type === Slottable) as
    | React.ReactElement<SlottableProps>
    | undefined;

  if (slottable && isValidElement(slottable.props.children)) {
    // CASE: Slottable 사용 - 명시적 타깃
    const target = slottable.props.children as React.ReactElement<
      ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> }
    >;

    // CASE: unwrap & hoist
    // - children 배열에서 Slottable 자리를 target의 "원래 children"로 치환하여,
    //   최종 출력에서 Slottable 래퍼가 사라지도록 만듭니다.
    const hoistedChildren = arr.map((child) => {
      if (child !== slottable) return child;
      return isValidElement(target) ? target.props.children : null;
    });

    // CASE: 병합된 props를 타깃에 주입하고, hoistedChildren을 자식으로 전달
    return cloneElement(
      target,
      mergeProps(
        { ...(props as ExtendedHTMLAttributes), ref } as ExtendedHTMLAttributes & {
          ref?: React.Ref<HTMLElement>;
        },
        target.props as ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
      ),
      hoistedChildren,
    );
  }

  // 2) Slottable이 없다면, 자동 타깃: 첫 번째 유효 ReactElement를 선택
  const firstValid = arr.find(isValidElement) as
    | React.ReactElement<ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> }>
    | undefined;

  // CASE: 유효 엘리먼트가 하나도 없을 때 - DEV 경고 후 null
  if (!firstValid) {
    if (import.meta.env?.DEV) {
      console.warn('[Slot] 유효한 ReactElement를 하나 이상 전달해 주세요.');
    }
    return null;
  }

  // CASE: 유효 엘리먼트가 둘 이상일 때 - DEV 경고(권장 패턴 안내)
  if (import.meta.env?.DEV) {
    const moreThanOne = arr.filter(isValidElement).length > 1;
    if (moreThanOne) {
      console.warn(
        '[Slot] 자동 타깃 모드에서는 유효한 ReactElement를 하나만 전달하는 것을 권장합니다. ' +
          '복잡한 트리에서는 <Slottable>로 타깃을 명시하세요.',
      );
    }
  }

  // CASE: 자동 타깃에 props 병합하여 원래 자리에 치환(형제 노드는 그대로 유지)
  const mapped = arr.map((child) => {
    if (child === firstValid) {
      return cloneElement(
        firstValid,
        mergeProps(
          { ...(props as ExtendedHTMLAttributes), ref } as ExtendedHTMLAttributes & {
            ref?: React.Ref<HTMLElement>;
          },
          firstValid.props as ExtendedHTMLAttributes & { ref?: React.Ref<HTMLElement> },
        ),
      );
    }
    return child; // 나머지 형제는 원형 유지
  });

  // CASE: Fragment로 감싸서 동일한 레벨로 출력 (DOM 래퍼 추가 없음)
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{mapped}</>;
};
