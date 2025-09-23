import { axiosInstance } from './axiosInstance';

/**
 * 랭킹 조회 API 요청 파라미터
 */
export interface RankingParams {
  page: number;
  size: number;
}

/**
 * 랭킹 조회
 * GET /members/ranking
 *
 * @param params 페이지네이션 파라미터
 * @returns 랭킹 데이터를 포함한 API 응답
 */
export const getRanking = (params: RankingParams) => {
  return axiosInstance.get('/members/ranking', {
    params,
  });
};
