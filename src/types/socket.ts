// 간단한 유저 타입
export type SimpleMember = {
  id: number;
  name: string;
  avatar?: string | null;
};

// 서버 → 클라이언트
export type ServerToClientEvents = {
  onReceive: ({ member, chat }: { member: SimpleMember; chat: string }) => void;
};

// 클라이언트 → 서버
export type ClientToServerEvents = {
  onJoinRoom: (roomId: string) => void;
  onSend: (data: { memberId: number; roomId: string; chat: string }) => void;
};

// 서버 간 이벤트
export type InterServerEvents = {
  ping: () => void;
};

// 소켓 연결 시 추가 데이터
export type SocketData = {
  name: string;
  age: number;
};
