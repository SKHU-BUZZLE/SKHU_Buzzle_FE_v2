import { axiosInstance } from './axiosInstance';

/** 싱글 퀴즈 생성 요청 파라미터 */
export interface CreateSingleQuizParams {
  /** 퀴즈 카테고리 */
  category: 'HISTORY' | 'SCIENCE' | 'SOCIETY' | 'CULTURE' | 'SPORTS' | 'NATURE' | 'MISC' | 'ALL';
  /** 생성할 문제 수 */
  size: number;
}

/**
 * 싱글 퀴즈 생성 API
 * @description 요청한 카테고리와 개수(size)만큼 퀴즈를 생성합니다.
 * @param params.category - 퀴즈 카테고리
 * @param params.size - 생성할 문제 수
 * @returns 서버 응답 (퀴즈 리스트)
 *
 * @example
 * ```ts
 * const { data } = await createSingleQuiz({
 *   category: 'NATURE',
 *   size: 3,
 * });
 * ```
 */
export const createSingleQuiz = ({ category, size }: CreateSingleQuizParams) => {
  return axiosInstance.post('/quiz/multiple', {
    category,
    size,
  });
};
