import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface BottomNavItemProps {
  to: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export default function BottomNavItem({ to, Icon, label }: BottomNavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        twMerge(
          'flex h-full flex-1 flex-col items-center justify-center gap-4',
          isActive ? 'text-white-900 dark:text-white-100' : 'text-white-600 dark:text-black-400',
        )
      }
      to={to}
    >
      <Icon aria-hidden='true' className='size-24' />
      <span className='text-[10px]'>{label}</span>
    </NavLink>
  );
}
