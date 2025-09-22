import { axiosInstance } from './axiosInstance';

interface CreateMultiRoomParams {
  maxPlayers: number;
  category: string;
  quizCount: number;
}

/**
 * 멀티룸 생성 API
 * @description maxPlayers, category, quizCount를 body에 담아 POST 요청합니다.
 */
export const createMultiRoom = ({ maxPlayers, category, quizCount }: CreateMultiRoomParams) => {
  return axiosInstance.post('/multi-room', {
    maxPlayers,
    category,
    quizCount,
  });
};
