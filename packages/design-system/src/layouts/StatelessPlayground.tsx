import { type ChangeEvent, type ComponentType, useEffect, useMemo, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

/** control form에서 입력 받은 값으로 다룰 수 있는 타입 */
type Primitive = string | number | boolean;
/**
 * control form 구성 요소
 * - `text`    : 문자열 입력
 * - `number`  : 숫자 입력
 * - `select`  : 옵션 선택
 * - `boolean` : true/false 라디오
 * - `handler` : 스코프 내 식별자(함수) 바인딩
 */
export type Spec =
  | { type: 'text'; propName: string; label?: string }
  | { type: 'number'; propName: string; label?: string }
  | { type: 'select'; propName: string; options: string[]; label?: string }
  | { type: 'boolean'; propName: string; label?: string }
  | { type: 'handler'; propName: string; options: string[]; label?: string };

interface StatelessPlaygroundProps<T extends object> {
  /** 테스트할 실제 컴포넌트 */
  component: ComponentType<T>;
  /** 최초 미리보기할 props */
  initialProps?: Record<string, Primitive>;
  /** control form의 스펙 리스트 */
  specs: ReadonlyArray<Spec>;
  /** 핸들러 이름이 가리킬 실제 함수들 */
  extraScope?: Record<string, unknown>;
}

/**
 * StatelessPlayground
 *
 * `react-live` 기반의 **Stateless** 컴포넌트 프리뷰/편집 컴포넌트입니다.
 * - `specs`를 기반으로 자동 생성된 **control form**을 통해 props 값을 실시간으로 편집할 수 있습니다.
 *   - `specs`은 식별 유니온 타입이기 때문에 아래 예시처럼 별도의 상수로 사용하는 경우 `satisfies ReadonlyArray<Spec>`으로 리터럴 타입을 유지시켜야 합니다.
 *   - 프로퍼티에 바로 사용하는 경우에는 `satisfies ReadonlyArray<Spec>`을 생략해도 됩니다.
 * - `extraScope`를 통해 외부에서 정의한 **이벤트 핸들러나 유틸 함수**를 주입하여 테스트할 수 있습니다.
 * - 간단한 props 조합 테스트나 시각적 확인에 적합하며, 상태 관리가 필요하다면 `StatefulPlayground`를 사용해야 합니다.
 *
 * @typeParam T - 테스트할 컴포넌트의 Props 객체 타입 (어떤 컴포넌트도 받을 수 있도록 제네릭으로 선언)
 *
 * @param props.component     - 미리보기 대상 실제 React 컴포넌트
 * @param props.initialProps  - 초기 렌더 시 적용할 props 값(컨트롤 폼 기본값)
 * @param props.specs         - 컨트롤 폼 스펙 목록 (각 prop의 입력 UI와 종류)
 * @param props.extraScope    - `react-live` 실행 스코프에 주입할 추가 심볼 딕셔너리
 *
 * @example
 * ```tsx
 * import StatelessPlayground, { type Spec } from '@/layouts/StatelessPlayground';
 * import Button from '@/components/Button';
 *
 * const specs = [
 *   { type: 'select',  propName: 'variant', options: ['primary', 'secondary'], label: 'Variant' },
 *   { type: 'boolean', propName: 'disabled', label: 'Disabled' },
 *   { type: 'text',    propName: 'children', label: 'Label' },
 *   { type: 'handler', propName: 'onClick',  options: ['handleClick'], label: 'onClick' },
 * ] satisfies ReadonlyArray<Spec>;
 *
 * function handleClick() { alert('clicked'); }
 *
 * export default function ButtonDoc() {
 *   return (
 *     <StatelessPlayground
 *       component={Button}
 *       initialProps={{ variant: 'primary', children: 'Click me' }}
 *       specs={specs}
 *       extraScope={{ handleClick }}
 *     />
 *   );
 * }
 * ```
 */
export default function StatelessPlayground<T extends object>({
  component,
  initialProps = {} as Record<string, Primitive>,
  specs,
  extraScope = {},
}: StatelessPlaygroundProps<T>) {
  /** react-live에서 확인할 코드 */
  const [code, setCode] = useState<string>('');
  /** 선택된 or 초기 props */
  const [componentProps, setComponentProps] = useState<Record<string, Primitive>>(initialProps);
  /** handler 타입인 prop들의 이름만 뽑아서 Set으로 보관
   * (JSX 속성 문자열을 만들 때 중괄호로 함수 식별자를 구분하기 위함) */
  const handlerKeys = useMemo(() => new Set(specs.filter((s) => s.type === 'handler').map((s) => s.propName)), [specs]);

  /** control form에서 값이 선택되면 componentProps 갱신 */
  function handlePropChange(key: string, value: Primitive | undefined) {
    setComponentProps((prev) => ({ ...prev, [key]: value as Primitive }));
  }

  /** control form
   * - specs를 순회하며 각 prop에 대응하는 입력폼을 렌더링
   * - control form을 통해 입력 값이 변경되면 handlePropChange로 componentProps를 갱신
   */
  const controlForm = specs.map((spec) => {
    const key = spec.propName;
    const val = componentProps[key];

    const wrapperClass = `flex flex-col md:flex-row gap-4`;
    const labelClass = `ds-text-normal w-1/4 mr-4 inline-flex items-center gap-1`;
    const inputClass = `ds-theme-bg-muted flex-1 rounded-md px-12 py-4 ds-text-strong font-mono border ds-theme-border-base ds-theme-border-focus focus:outline-0`;
    const optionClass = `mr-16 inline-flex items-center gap-4 cursor-pointer ds-text-strong font-mono`;

    switch (spec.type) {
      case 'text':
        /** text로 prop을 입력받을 때 */
        return (
          <div key={key} className={wrapperClass}>
            <label className={labelClass}>{spec.label ?? key}</label>
            <input
              className={inputClass}
              placeholder='테스트할 내용을 작성해주세요'
              type='text'
              value={String((val as string) ?? '')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePropChange(key, e.target.value)}
            />
          </div>
        );

      case 'number':
        /** 숫자로 prop을 입력받을 때 */
        return (
          <div key={key} className={wrapperClass}>
            <label className={labelClass}>{spec.label ?? key}</label>
            <input
              className={inputClass}
              type='number'
              value={val === undefined ? '' : String(val)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                handlePropChange(key, v === '' ? (undefined as any) : Number(v));
              }}
            />
          </div>
        );

      case 'select':
        /** select로 prop을 선택할 때 */
        return (
          <div key={key} className={wrapperClass}>
            <label className={labelClass}>{spec.label ?? key}</label>
            <select
              className={inputClass}
              value={String((val as string) ?? '')}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePropChange(key, e.target.value)}
            >
              {spec.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case 'boolean':
        /** radio로 prop 상태를 선택할 때 */
        return (
          <div key={key} className={wrapperClass}>
            <span className={labelClass}>{spec.label ?? key}</span>
            <label className={optionClass}>
              <input
                checked={val === true}
                name={key}
                type='radio'
                value='true'
                onChange={() => handlePropChange(key, true)}
              />
              true
            </label>
            <label className={optionClass}>
              <input
                checked={val === false}
                name={key}
                type='radio'
                value='false'
                onChange={() => handlePropChange(key, false)}
              />
              false
            </label>
          </div>
        );

      case 'handler':
        /** handler를 연결할 때 */
        return (
          <div key={key} className={wrapperClass}>
            <label className={labelClass}>{spec.label ?? key}</label>
            <select
              className={inputClass}
              value={String((val as string) ?? '')}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePropChange(key, e.target.value)}
            >
              <option value=''>(none)</option>
              {spec.options.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        );
    }
  });

  /** control에서 입력받은 props를 문자열로 변환 */
  useEffect(() => {
    const entries = Object.entries(componentProps as Record<string, Primitive | undefined>);

    const attrs = entries
      .map(([k, v]) => {
        if (v === undefined || v === '') return null;
        if (handlerKeys.has(k)) return `${k}={${v}}`; // 핸들러라면 식별자로 추가
        if (typeof v === 'boolean') return v ? k : null; // true만 포함
        if (typeof v === 'number') return `${k}={${v}}`; // 숫자는 중괄호
        return `${k}="${v}"`; // 문자열
      })
      .filter(Boolean)
      .join(' ');

    const Comp: any = component; // component는 제네릭으로 일반 함수 타입으로 제한됨. 따라서 `.displayName`, `.name`과 같은 속성을 쓸 수 없기 때문에 any로 변환 후 사용
    const compName = (Comp as any).displayName || (Comp as any).name || 'Component'; // 컴포넌트 이름을 문자열로 추출
    const tag = attrs ? `<${compName} ${attrs} />` : `<${compName} />`;
    setCode(tag);
  }, [component, componentProps, handlerKeys]);

  /** react-live 실행 환경에서 제한할 스코프 범위 설정. 스코프는 변하지 않기 때문에 useMemo로 처리 */
  const scope = useMemo(() => {
    const Comp: any = component; // component는 제네릭으로 일반 함수 타입으로 제한됨. 따라서 `.displayName`, `.name`과 같은 속성을 쓸 수 없기 때문에 any로 변환 후 사용
    const compName = Comp.displayName || Comp.name || 'Component';
    return { [compName]: component, ...extraScope } as Record<string, unknown>; // extraScope를 합쳐서 props로 넘길 함수 핸들러나 React 훅을 사용할 수 있음
  }, [component, extraScope]);

  return (
    <LiveProvider code={code} language='tsx' scope={scope}>
      <div className='flex flex-col gap-24'>
        <div className='ds-theme-bg-base ds-theme-border-base min-h-xl flex flex-col justify-center overflow-auto rounded-2xl border px-12 py-12'>
          <LivePreview />
        </div>

        <form className='flex w-full flex-col gap-24 md:gap-12'>{controlForm}</form>

        <div className='flex flex-col gap-8'>
          <LiveEditor className='rounded-2xl bg-[#011627] p-5 font-mono text-sm text-white' />
          <LiveError className='text-error-red-500 mt-2 text-sm' />
        </div>
      </div>
    </LiveProvider>
  );
}
