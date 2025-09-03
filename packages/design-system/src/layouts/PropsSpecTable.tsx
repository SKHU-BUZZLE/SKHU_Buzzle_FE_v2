/**
 * `PropSpec`은 컴포넌트의 개별 Prop에 대한 메타데이터를 정의합니다.
 *
 * @property propName     - Prop 이름
 * @property type         - Prop의 타입 배열 (예: ["string", "number"])
 * @property description  - Prop 설명 (옵션)
 * @property required     - 필수 여부 (true면 * 표시)
 * @property defaultValue - 기본값
 * @property options      - 선택 가능한 옵션 배열
 */
interface PropSpec {
  propName: string;
  type: string[];
  description?: string;
  required?: boolean;
  defaultValue?: string;
  options?: string[];
}

const thClass = `text-title font-bold py-8`;
const tdClass = `font-mono text-body py-8`;

/**
 * PropsSpecTable
 *
 * 컴포넌트의 Prop 사양(`PropSpec[]`)을 표로 렌더링합니다.
 * - Name / Type / Default / Options / Description 컬럼을 제공
 * - 필수 Prop은 *로 표시
 * - Options나 Description이 없으면 "-" 표시
 *
 * @param props.specs - `PropSpec` 객체 배열 (표에 렌더링할 데이터)
 *
 * @example
 * ```tsx
 * import PropsSpecTable from '@/layouts/PropsSpecTable';
 *
 * const specs = [
 *   {
 *     propName: 'disabled',
 *     type: ['boolean'],
 *   },
 *   {
 *     propName: 'variant',
 *     type: ['"primary"', '"secondary"'],
 *     description: '버튼 스타일',
 *     required: true,
 *     defaultValue: '"primary"',
 *     options: ['"primary"', '"secondary"'],
 *   },
 * ];
 *
 * export default function ButtonDoc() {
 *   return <PropsSpecTable specs={specs} />;
 * }
 * ```
 */
export default function PropsSpecTable({ specs }: { specs: PropSpec[] }) {
  return (
    <div className='border-surface overflow-x-auto rounded-2xl border px-16 py-12'>
      <table className='w-full [&_tbody>tr>td:not(:first-child)]:pl-48 [&_thead>tr>th:not(:first-child)]:pl-48'>
        <thead>
          <tr className='text-left'>
            <th className={thClass}>Name</th>
            <th className={thClass}>Type</th>
            <th className={thClass}>Default</th>
            <th className={thClass}>Options</th>
            <th className={thClass}>Description</th>
          </tr>
        </thead>
        <tbody className='divide-white-300 dark:divide-dm-black-700 divide-y text-sm'>
          {specs.map((s) => (
            <tr key={s.propName}>
              <td className={`${tdClass} whitespace-nowrap`}>
                {s.propName}
                {s.required && <span className='text-error-red-500'> *</span>}
              </td>
              <td className={tdClass}>
                <div className='flex flex-wrap gap-6'>
                  {s.type.map((t) => (
                    <span key={t} className='bg-surface-muted inline-block rounded px-8 py-2 font-mono'>
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className={tdClass}>{s.defaultValue ?? <span className='text-caption'>-</span>}</td>
              <td className={tdClass}>
                <div className='flex flex-wrap gap-6'>
                  {s.options?.map((o) => (
                    <span key={o} className='bg-surface-muted inline-block rounded px-8 py-2 font-mono'>
                      {o}
                    </span>
                  ))}
                  {!s.options && <span className='text-caption'>-</span>}
                </div>
              </td>
              <td className={tdClass}>{s.description ?? <span className='text-caption'>-</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
