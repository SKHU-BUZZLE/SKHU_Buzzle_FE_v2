import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { deleteIncorrectNote, getIncorrectNoteDetail, getIncorrectNotes } from '../apis/review';

/** 쿼리 키 */
export const reviewQueryKeys = {
  all: ['review'] as const,
  incorrectNotes: (size: number) => [...reviewQueryKeys.all, 'incorrectNotes', { size }] as const,
  incorrectNoteDetail: (id: number) => [...reviewQueryKeys.all, 'incorrectNoteDetail', id] as const,
};

/** 무한 스크롤 훅 (캐시에 도메인 데이터만 저장) */
export const useInfiniteIncorrectNotes = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: reviewQueryKeys.incorrectNotes(size),
    queryFn: async ({ pageParam = 0 }) => {
      const params = { page: pageParam, size };
      const res = await getIncorrectNotes(params);
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
      const pages = data.pages; // 각 페이지: { pageInfo, content }
      const notes = pages.flatMap((p) => p.content);

      return {
        ...data,
        // 편의 필드
        notes,
      };
    },
  });
};

/** 오답노트 상세 조회 훅 */
export const useIncorrectNoteDetail = (quizResultId: number) => {
  return useQuery({
    queryKey: reviewQueryKeys.incorrectNoteDetail(quizResultId),
    queryFn: () => getIncorrectNoteDetail(quizResultId),
    enabled: !!quizResultId,
    select: (data) => data.data.data, // API 응답에서 실제 데이터 추출
  });
};

/** 오답노트 삭제 훅 */
export const useDeleteIncorrectNote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizResultId: number) => deleteIncorrectNote(quizResultId),
    onSuccess: () => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: reviewQueryKeys.all });
      navigate('/review');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    },
  });
};
