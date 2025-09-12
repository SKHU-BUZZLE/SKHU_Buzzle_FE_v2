import { HeartIcon } from '../icons';

export default function LifeCounter({ life = 0 }: { life: number }) {
  return (
    <div className='text-body-1 bg-white-400 dark:bg-dm-black-600 text-black-300 dark:text-black-100 flex w-fit items-center gap-8 rounded-full px-16 py-6'>
      <HeartIcon className='text-primary-500 size-18' />
      <p>{life}</p>
    </div>
  );
}
