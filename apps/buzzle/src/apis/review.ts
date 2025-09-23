import { axiosInstance } from './axiosInstance';

interface GetIncorrectNotesParams {
  page: number;
  size: number;
  sort?: string;
}

export const getIncorrectNotes = (params: GetIncorrectNotesParams) => {
  return axiosInstance.get('/quiz/incorrect-notes', { params });
};
