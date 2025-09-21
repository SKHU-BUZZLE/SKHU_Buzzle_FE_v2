/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { SampleSingleResponse } from './mockSingle';

export const mockInstance = axios.create();

mockInstance.post = async (url: string, _?: any) => {
  if (url === '/quiz/multiple') {
    return Promise.resolve(SampleSingleResponse as any);
  }
  return Promise.reject(new Error(`No mock response for POST ${url}`));
};
