import { getRanking, type RankingParams } from '@apis/ranking';
import { useInfiniteQuery } from '@tanstack/react-query';

/** 쿼리 키 */
export const rankingQueryKeys = {
  all: ['ranking'] as const,
  list: (size: number) => [...rankingQueryKeys.all, 'list', { size }] as const,
};

/** 무한 스크롤 훅 (캐시에 도메인 데이터만 저장) */
export const useInfiniteRanking = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: rankingQueryKeys.list(size),
    queryFn: async ({ pageParam = 0 }) => {
      const params: RankingParams = { page: pageParam, size };
      const res = await getRanking(params);
      return res.data.data;
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pageInfo;
      const next = currentPage + 1;
      return next < totalPages ? next : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    // ✅ 선택: 사용 편의용 파생 필드 주입
    select: (data) => {
      const pages = data.pages; // 각 페이지: { pageInfo, rankings, currentUser }
      const rankings = pages.flatMap((p) => p.rankings);
      const currentUser = pages[0]?.currentUser ?? null;
      const totalMembers = pages[0]?.totalMembers ?? null;

      return {
        ...data,
        // 편의 필드
        rankings,
        currentUser,
        totalMembers,
      };
    },
  });
};
