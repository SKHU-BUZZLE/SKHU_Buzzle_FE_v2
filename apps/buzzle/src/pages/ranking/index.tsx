import { RankingItem, VictoryStand } from '@buzzle/design';
import MyRankingCard from '@components/MyRankingCard';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useInfiniteRanking } from '@hooks/useRanking';
import { motion } from 'motion/react';

export default function RankingPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteRanking(10);
  // 무한 스크롤 데이터에서 현재 사용자 정보 추출
  const rankings = data?.rankings ?? [];
  const currentUser = data?.currentUser ?? null;
  const totalMembers = data?.totalMembers ?? 0;

  const topThree = {
    first: rankings.find((user) => user.currentRanking === 1) || null,
    second: rankings.find((user) => user.currentRanking === 2) || null,
    third: rankings.find((user) => user.currentRanking === 3) || null,
  };

  // 무한 스크롤을 위한 observer
  const observerRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    isFetchingNextPage,
    !hasNextPage,
  );

  if (isLoading) {
    return (
      <section className='space-y-8'>
        <h1 className='ds-typ-heading-2 ds-text-strong'>버즐 랭킹</h1>
        <div className='flex justify-center py-40'>
          <p className='ds-text-caption'>랭킹을 불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='space-y-8'>
        <h1 className='ds-typ-heading-2 ds-text-strong'>버즐 랭킹</h1>
        <div className='flex justify-center py-40'>
          <p className='ds-text-caption'>랭킹을 불러오는데 실패했습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <div className='relative flex min-h-full flex-col pb-140'>
      <p className='ds-typ-body-3 ds-text-caption mt-12'>총 {totalMembers}명 참여중</p>
      <h1 className='ds-typ-heading-2 ds-text-strong mb-24'>버즐 랭킹</h1>

      {topThree.first && topThree.second && topThree.third && (
        <div className='bg-white-200 dark:bg-dm-black-700 rounded-3xl pt-30 pb-48'>
          <VictoryStand
            first={{
              rank: topThree.first.currentRanking,
              name: topThree.first.name,
              score: topThree.first.streak,
              src: topThree.first.picture,
            }}
            second={{
              rank: topThree.second.currentRanking,
              name: topThree.second.name,
              score: topThree.second.streak,
              src: topThree.second.picture,
            }}
            third={{
              rank: topThree.third.currentRanking,
              name: topThree.third.name,
              score: topThree.third.streak,
              src: topThree.third.picture,
            }}
          />
        </div>
      )}

      {/* <div className='mt-36 space-y-28'> */}
      <motion.ul className='mt-36 space-y-28'>
        {rankings.map((user, i) => (
          <motion.li
            key={user.email}
            initial={{ y: 16, opacity: 0 }}
            style={{ willChange: 'transform' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 0.6, delay: i * 0.08 }} // 살짝 딜레이
            viewport={{ once: true, amount: 0.2 }} // 20% 보이면 트리거, 한 번만 재생
            whileInView={{ y: 0, opacity: 1 }}
          >
            <RankingItem
              key={user.email}
              name={user.name}
              rank={user.currentRanking}
              score={user.streak}
              src={user.picture}
            />
          </motion.li>
        ))}
      </motion.ul>
      {/* </div> */}

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className='h-1' />

      {/* 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <div className='flex justify-center py-20'>
          <p className='ds-text-muted'>더 많은 랭킹을 불러오는 중...</p>
        </div>
      )}

      {/* 하단 고정 내 랭킹 */}
      {currentUser && (
        <MyRankingCard
          name={currentUser.name}
          rank={currentUser.currentRanking}
          score={currentUser.streak}
          src={currentUser.picture}
        />
      )}
    </div>
  );
}
