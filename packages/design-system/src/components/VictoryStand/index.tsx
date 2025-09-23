import RankedAvatar from '@components/RankedAvatar';
import { twMerge } from 'tailwind-merge';

interface VictoryStandProps {
  first: { rank: 1; name: string; score: number; src?: string };
  second: { rank: 2; name: string; score: number; src?: string };
  third: { rank: 3; name: string; score: number; src?: string };
  className?: string;
}

export default function VictoryStand({ first, second, third, className }: VictoryStandProps) {
  return (
    <div className={twMerge('flex w-full items-end justify-center gap-36', className)}>
      {/* 2등 */}
      <RankedAvatar {...second} />

      {/* 1등 */}
      <div className='translate-y-8'>
        <RankedAvatar {...first} />
      </div>

      {/* 3등 */}
      <RankedAvatar {...third} />
    </div>
  );
}
