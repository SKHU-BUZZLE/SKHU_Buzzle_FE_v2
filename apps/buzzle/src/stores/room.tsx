import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** @interface Room : 생성된 방 정보 저장 */
export interface Room {
  category: string;
  hostName: string;
  inviteCode: string;
  maxPlayers: number;
  quizCount: number;
}

/** 참여자 정보 */
export interface Player {
  email: string;
  isHost?: boolean;
  name: string;
  picture: string;
  isWinner?: boolean;
  rank?: number;
  score?: number;
}

/** 초기 방 정보 */
export interface RoomDetails {
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
export interface Question {
  options: string[];
  question: string;
  questionIndex: number;
}

/** 채점 결과 */
export interface AnswerResult {
  correct: boolean;
  correctAnswer: string;
  message: string;
  userSelectedIndex: string;
  userEmail: string;
  userName: string;
}

/** 점수 현황 */
export interface LeaderBoard {
  currentLeader: string;
  scores: Record<string, number>;
}

/** 게임 결과 */
export interface QuizResult {
  message: string;
  rankings: Player[];
}

/** 값 또는 함수형 업데이터 타입 유틸 */
type Updater<T> = T | ((prev: T) => T);

/** zustand state 정의 (null을 사용해 초기 미세분기 용이) */
interface RoomState {
  room: Room | null;
  roomDetails: RoomDetails | null;
  question: Question | null;
  remainingTime: number | null;
  answerResult: AnswerResult | null;
  leaderBoard: LeaderBoard | null;
  quizResult: QuizResult | null;

  // setters: 값 또는 함수형 업데이터 모두 허용
  setRoom: (next: Updater<Room | null>) => void;
  setRoomDetails: (next: Updater<RoomDetails | null>) => void;
  setQuestion: (next: Updater<Question | null>) => void;
  setRemainingTime: (next: Updater<number | null>) => void;
  setAnswerResult: (next: Updater<AnswerResult | null>) => void;
  setLeaderBoard: (next: Updater<LeaderBoard | null>) => void;
  setQuizResult: (next: Updater<QuizResult | null>) => void;

  // 전체 초기화
  clear: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      room: null,
      roomDetails: null,
      question: null,
      remainingTime: null,
      answerResult: null,
      leaderBoard: null,
      quizResult: null,

      setRoom: (next) =>
        set((s) => ({ room: typeof next === 'function' ? (next as (p: Room | null) => Room | null)(s.room) : next })),

      setRoomDetails: (next) =>
        set((s) => ({
          roomDetails:
            typeof next === 'function' ? (next as (p: RoomDetails | null) => RoomDetails | null)(s.roomDetails) : next,
        })),

      setQuestion: (next) =>
        set((s) => ({
          question: typeof next === 'function' ? (next as (p: Question | null) => Question | null)(s.question) : next,
        })),

      setRemainingTime: (next) =>
        set((s) => ({
          remainingTime:
            typeof next === 'function' ? (next as (p: number | null) => number | null)(s.remainingTime) : next,
        })),

      setAnswerResult: (next) =>
        set((s) => ({
          answerResult:
            typeof next === 'function'
              ? (next as (p: AnswerResult | null) => AnswerResult | null)(s.answerResult)
              : next,
        })),

      setLeaderBoard: (next) =>
        set((s) => ({
          leaderBoard:
            typeof next === 'function' ? (next as (p: LeaderBoard | null) => LeaderBoard | null)(s.leaderBoard) : next,
        })),

      setQuizResult: (next) =>
        set((s) => ({
          quizResult:
            typeof next === 'function' ? (next as (p: QuizResult | null) => QuizResult | null)(s.quizResult) : next,
        })),

      clear: () =>
        set({
          room: null,
          roomDetails: null,
          question: null,
          remainingTime: null,
          answerResult: null,
          leaderBoard: null,
          quizResult: null,
        }),
    }),
    {
      name: 'multi-room-storage',
    },
  ),
);
