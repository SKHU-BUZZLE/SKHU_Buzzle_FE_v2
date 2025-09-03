interface PropSpec {
  propName: string;
  type: string[];
  description?: string;
  required?: boolean;
  defaultValue?: string;
  options?: string[];
}

const thClass = `text-black-600 font-bold py-8`;
const tdClass = `font-mono text-black-300 py-8`;

export default function PropsSpecTable({ specs }: { specs: PropSpec[] }) {
  return (
    <div className='border-white-200 overflow-x-auto rounded-2xl border px-16 py-12'>
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
        <tbody className='divide-white-200 divide-y text-sm'>
          {specs.map((s) => (
            <tr key={s.propName}>
              <td className={`${tdClass} whitespace-nowrap`}>
                {s.propName}
                {s.required && <span className='text-error-red-500'> *</span>}
              </td>
              <td className={tdClass}>
                <div className='flex flex-wrap gap-6'>
                  {s.type.map((t) => (
                    <span key={t} className='bg-white-100 inline-block rounded px-8 py-2 font-mono'>
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className={tdClass}>{s.defaultValue ?? <span className='text-black-100'>-</span>}</td>
              <td className={tdClass}>
                <div className='flex flex-wrap gap-6'>
                  {s.options?.map((o) => (
                    <span key={o} className='bg-white-100 inline-block rounded px-8 py-2 font-mono'>
                      {o}
                    </span>
                  ))}
                </div>
              </td>
              <td className={tdClass}>{s.description ?? <span className='text-black-100'>-</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
