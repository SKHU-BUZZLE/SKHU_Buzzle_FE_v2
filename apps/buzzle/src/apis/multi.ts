import { EventSourcePolyfill } from 'event-source-polyfill';

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

/**
 * 초대 코드 유효성 검사 API
 * @description inviteCode를 body에 담아 POST 요청합니다.
 */
export const validateInviteCode = ({ inviteCode }: { inviteCode: string }) => {
  return axiosInstance.post('/multi-room/validate-invite', { inviteCode });
};

/**
 * 빠른 매칭 큐 참가 API
 * @description 서버의 매칭 큐에 참가합니다.
 */
export const joinMatchingQueue = () => {
  return axiosInstance.post('/match/v2');
};

/**
 * 빠른 매칭 큐 취소 API
 * @description 매칭 큐 참가를 취소합니다.
 */
export const cancelMatchingQueue = () => {
  return axiosInstance.post('/match/cancel/v2');
};

/** 랜덤 매칭 SSE */
export function createMatchingStream(accessToken: string | null) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/connect`;
  const es = new EventSourcePolyfill(url, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    withCredentials: true,
    heartbeatTimeout: 600_000,
  });

  // 연결 오픈 확인용
  const openPromise = new Promise<void>((resolve, reject) => {
    es.addEventListener('open', () => {
      resolve();
    });
    es.addEventListener('error', (err) => {
      if (es.readyState === EventSource.CLOSED) {
        console.warn('🔌 SSE 연결이 종료되었습니다.');
      } else {
        console.error('❌ SSE 에러 발생:', err);
      }
      try {
        es.close();
      } catch {
        /* empty */
      }
      reject(new Error('SSE 연결 오류/종료'));
    });
  });

  // roomId 수신용
  let settled = false;
  const roomIdPromise = new Promise<string>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    es.addEventListener('matchInfo' as any, (evt) => {
      const ev = evt as MessageEvent<string>;
      try {
        const payload = JSON.parse(ev.data) as { roomId?: string };
        if (!settled && payload?.roomId) {
          settled = true;
          resolve(payload.roomId);
        }
      } catch {
        /* empty */
      }
    });
  });

  const close = () => {
    try {
      es.close();
    } catch {
      /* empty */
    }
  };

  return { es, openPromise, roomIdPromise, close };
}
