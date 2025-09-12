import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Section = 'foundation' | 'component' | 'root';

const NAV_ITEMS: Record<Section, { label: string; to: string }[]> = {
  root: [{ label: 'Introduction', to: '/docs' }],
  foundation: [{ label: 'Color', to: '/docs/foundation/Color' }],
  component: [
    { label: 'Button', to: '/docs/component/Button' },
    { label: 'Input', to: '/docs/component/Input' },
    { label: 'Icons', to: '/docs/component/Icons' },
    { label: 'LifeCounter', to: '/docs/component/LifeCounter' },
    { label: 'ProfileImage', to: '/docs/component/ProfileImage' },
],
};

/** 현재 URL 경로 중 해당하는 Section 타입(foundation | component | root)을 반환 */
function useSection(pathname: string): Section {
  // const { pathname } = useLocation();
  const seg = pathname.split('/')[2]; // url에서 /docs 다음 경로
  if (seg === 'foundation' || seg === 'component') return seg;
  return 'root';
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const section = useSection(pathname);
  const [query, setQuery] = useState('');

  // 현재 Section의 Nav Items을 가져옴 (기본은 root)
  const items =
    section === 'root'
      ? [...NAV_ITEMS.foundation, ...NAV_ITEMS.component] // root라면 foundation+component 합쳐서
      : (NAV_ITEMS[section] ?? NAV_ITEMS.root);
  // 검색어가 비어있지 않으면 Nav Items에서 필터링. 검색어가 비어있다면 전체 Items를 반환
  const filtered = query.trim()
    ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  // 섹션 전환 시 검색어 초기화
  useEffect(() => {
    setQuery('');
  }, [section]);

  return (
    <nav className='border-surface px-28 py-20'>
      <input
        className='border-surface focus-border-surface w-full rounded-lg border px-8 py-4 text-sm focus:outline-0'
        placeholder='Search'
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className='mt-20 list-none p-0 text-sm'>
        {filtered.map((item) => (
          <li key={item.to} className='mb-12'>
            <Link
              className={`rounded px-2 py-1 hover:opacity-50 ${pathname.endsWith(`${item.label}`) ? 'text-primary-500' : ''}`}
              to={item.to}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {filtered.length === 0 && <li className='text-black-200 mt-4 text-sm'>검색 결과가 없습니다</li>}
      </ul>
    </nav>
  );
}
