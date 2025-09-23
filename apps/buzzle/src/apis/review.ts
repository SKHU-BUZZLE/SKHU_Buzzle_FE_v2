import { axiosInstance } from './axiosInstance';

interface GetIncorrectNotesParams {
  page: number;
  size: number;
  sort?: string;
}

export const getIncorrectNotes = (params: GetIncorrectNotesParams) => {
  return axiosInstance.get('/quiz/incorrect-notes', { params });
};

export const getIncorrectNoteDetail = (quizResultId: number) => {
  return axiosInstance.get(`/quiz/incorrect-notes/${quizResultId}`);
};

export const deleteIncorrectNote = (quizResultId: number) => {
  return axiosInstance.delete(`/quiz/incorrect-notes/${quizResultId}`);
};
