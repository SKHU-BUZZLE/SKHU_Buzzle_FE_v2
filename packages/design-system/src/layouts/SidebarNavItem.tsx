import { Link } from 'react-router-dom';

interface SidebarNavItemProps {
  to: string;
  label: string;
}

export default function SidebarNavItem({ to, label }: SidebarNavItemProps) {
  return (
    <li className='mb-12'>
      <Link to={to}>{label}</Link>
    </li>
  );
}
