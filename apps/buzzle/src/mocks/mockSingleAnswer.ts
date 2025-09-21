/** 싱글 퀴즈 정답 제출 Mock
 * - 서버 스펙 그대로 body를 받고,
 * - 정답 여부를 비교해 axios 응답 형태로 반환합니다.
 */
export const mockSubmitSingleAnswer = async (body: {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswerNumber: '1' | '2' | '3' | '4';
  /** 미선택(타임아웃) 시 null */
  userAnswerNumber: '1' | '2' | '3' | '4' | 'timeout';
  category: 'HISTORY' | 'SCIENCE' | 'SOCIETY' | 'CULTURE' | 'SPORTS' | 'NATURE' | 'MISC' | 'ALL';
}) => {
  const isCorrect = body.userAnswerNumber !== 'timeout' && body.userAnswerNumber === body.correctAnswerNumber;

  return {
    status: 200,
    statusText: 'OK',
    headers: { 'content-type': 'application/json' },
    config: {},
    data: {
      code: '200',
      message: isCorrect ? 'OK' : '오답입니다.',
      data: isCorrect,
    },
  };
};
