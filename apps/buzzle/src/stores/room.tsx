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

interface RoomContextValue {
  /** 방 생성 직후 기본 정보 */
  room: Room | undefined;
  setRoom: Dispatch<SetStateAction<Room | undefined>>;

  /** 서버에서 내려준 방 상세 상태 */
  roomDetails: RoomDetails | undefined;
  setRoomDetails: Dispatch<SetStateAction<RoomDetails | undefined>>;
}

const RoomContext = createContext<RoomContextValue | undefined>(undefined);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [roomDetails, setRoomDetails] = useState<RoomDetails | undefined>(undefined);

  return <RoomContext.Provider value={{ room, setRoom, roomDetails, setRoomDetails }}>{children}</RoomContext.Provider>;
}

export function useRoom() {
  const ctx = useContext(RoomContext);
  if (!ctx) {
    throw new Error('useRoom은 RoomProvider 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}
