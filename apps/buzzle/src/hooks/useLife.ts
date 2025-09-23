import { submitSingleAnswer, type SubmitSingleAnswerBody } from '@apis/single';
import { getMyLife } from '@apis/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/** 라이프 쿼리 키 */
export const LIFE_QUERY_KEY = ['user', 'life'] as const;

/**
 * 사용자 라이프 조회 hook
 * @description 서버에서 현재 라이프를 가져와 캐싱합니다.
 */
export const useLife = () => {
  return useQuery({
    queryKey: LIFE_QUERY_KEY,
    queryFn: async () => {
      const response = await getMyLife();
      return response.data.data.life as number;
    },
    staleTime: 1000 * 60, // 1분간 fresh 상태 유지 (라이프는 자주 변경될 수 있음)
    gcTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};

/**
 * 싱글 퀴즈 답안 제출 뮤테이션
 * @description 답안 제출 후 자동으로 라이프를 다시 가져옵니다.
 */
export const useSubmitSingleAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitSingleAnswerBody) => submitSingleAnswer(data),
    onSuccess: () => {
      // 답안 제출 성공 시 라이프 쿼리 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: LIFE_QUERY_KEY });
    },
    onError: (error) => {
      console.error('답안 제출 실패:', error);
      // 에러 발생 시에도 라이프 상태 확인을 위해 리패치
      queryClient.invalidateQueries({ queryKey: LIFE_QUERY_KEY });
    },
  });
};

/**
 * 라이프 수동 리패치 hook
 * @description 필요시 수동으로 라이프를 다시 가져올 때 사용
 */
export const useRefreshLife = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: LIFE_QUERY_KEY });
  };
};
