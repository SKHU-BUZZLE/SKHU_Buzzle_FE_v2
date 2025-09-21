/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { SampleSingleResponse } from './mockSingle';
import { mockSubmitSingleAnswer } from './mockSingleAnswer';

export const mockInstance = axios.create();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

mockInstance.post = async (url: string, data?: any) => {
  if (url === '/quiz/multiple') {
    // 3초 지연 후 반환(문제 생성 테스트)
    await sleep(3000);
    return Promise.resolve(SampleSingleResponse as any);
  }

  if (url === '/quiz/answer') {
    return Promise.resolve((await mockSubmitSingleAnswer(data)) as any);
  }

  return Promise.reject(new Error(`No mock response for POST ${url}`));
};
