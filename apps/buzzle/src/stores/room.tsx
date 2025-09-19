/** ws에서 사용하는 정보들 */
import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react';

/** @interface Room : 생성된 방 정보 저장 */
export interface Room {
  category: string;
  hostName: string;
  inviteCode: string;
  maxPlayers: number;
  quizCount: number;
}

/** 참여자 정보 */
interface Player {
  email: string;
  isHost: boolean;
  name: string;
  picture: string;
}

/** 초기 방 정보 */
interface RoomDetails {
  canStartGame: boolean;
  category: string;
  currentPlayers: number;
  gameStarted: boolean;
  hostName: string;
  inviteCode: string;
  maxPlayers: number;
  players: Player[];
  quizCount: number;
  roomId: string;
}

/** 퀴즈 */
interface Question {
  options: string[];
  question: string;
  questionIndex: number;
}

/** 채점 결과 */
interface AnswerResult {
  correct: boolean;
  correctAnswer: string;
  message: string;
  userSelectedIndex: string;
}

interface RoomContextValue {
  /** 방 생성 직후 기본 정보 */
  room: Room | undefined;
  setRoom: Dispatch<SetStateAction<Room | undefined>>;

  /** 서버에서 내려준 방 상세 상태 */
  roomDetails: RoomDetails | undefined;
  setRoomDetails: Dispatch<SetStateAction<RoomDetails | undefined>>;

  /** 퀴즈 */
  question: Question | undefined;
  setQuestion: Dispatch<SetStateAction<Question | undefined>>;

  /** 채점 결과 */
  answerResult: AnswerResult | undefined;
  setAnswerResult: Dispatch<SetStateAction<AnswerResult | undefined>>;
}

const RoomContext = createContext<RoomContextValue | undefined>(undefined);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [roomDetails, setRoomDetails] = useState<RoomDetails | undefined>(undefined);
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [answerResult, setAnswerResult] = useState<AnswerResult | undefined>(undefined);

  return (
    <RoomContext.Provider
      value={{ room, setRoom, roomDetails, setRoomDetails, question, setQuestion, answerResult, setAnswerResult }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const ctx = useContext(RoomContext);
  if (!ctx) {
    throw new Error('useRoom은 RoomProvider 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}
