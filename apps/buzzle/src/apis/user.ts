import { axiosInstance } from './axiosInstance';

/**
 * 내 정보 조회
 * GET /members/my-page
 *
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export const getMyProfile = () => {
  return axiosInstance.get('/members/my-page');
};

/**
 * 회원 생명(life) 조회
 * GET /members/life
 *
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export const getMyLife = () => {
  return axiosInstance.get('/members/life');
};
