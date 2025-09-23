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

/** 정답 제출 요청 바디 */
export interface SubmitSingleAnswerBody {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  /** 서버 스웨거 예시 기준: "1" | "2" | "3" | "4" */
  correctAnswerNumber: '1' | '2' | '3' | '4';
  /**
   * 유저가 선택한 답변 번호
   * - 선택 안 하고 시간 초과 시 'timeout'
   */
  userAnswerNumber: '1' | '2' | '3' | '4' | 'timeout';
  /** 퀴즈 카테고리 */
  category: 'HISTORY' | 'SCIENCE' | 'SOCIETY' | 'CULTURE' | 'SPORTS' | 'NATURE' | 'MISC' | 'ALL';
}

/**
 * 싱글 퀴즈 정답 제출 API
 * @description
 * 사용자가 선택한 답안을 서버에 제출합니다.
 * 서버는 정답 여부를 판별하여 메시지와 boolean 값을 반환합니다.
 *
 * @param body - 제출할 정답 데이터
 * @returns Axios Promise (서버 응답: { code: string, message: string, data: boolean })
 *
 * @example
 * ```ts
 * const { data } = await submitSingleAnswer({
 *   question: "고양이는 포유류인가요?",
 *   option1: "아니요",
 *   option2: "네",
 *   option3: "아마도요",
 *   option4: "모르겠어요",
 *   correctAnswerNumber: "2",
 *   userAnswerNumber: "2",
 *   category: "NATURE",
 * });
 *
 * console.log(data.data); // true | false
 * console.log(data.message); // "OK" | "오답입니다."
 * ```
 */
export const submitSingleAnswer = ({
  question,
  option1,
  option2,
  option3,
  option4,
  correctAnswerNumber,
  userAnswerNumber,
  category,
}: SubmitSingleAnswerBody) => {
  return axiosInstance.post('/quiz/answer', {
    question,
    option1,
    option2,
    option3,
    option4,
    correctAnswerNumber,
    userAnswerNumber,
    category,
  });
};
