import { mockInstance } from '@mocks/mockInstance';
import { useEffect } from 'react';

export default function SinglePlayPage() {
  useEffect(() => {
    async function fetchData() {
      const res = await mockInstance.post('/quiz/multiple', {
        category: 'ALL',
        size: 4,
      });
      console.log(res.data.data.quizResDtos); // 퀴즈 배열 확인
    }
    fetchData();
  }, []);

  return <div>퀴즈 모크 테스트 페이지</div>;
}
