export type ChatWithMember = {
  id: number;
  chat: string;
  createdAt: Date;
  updatedAt: Date;
  memberId: number | null;
  roomId: number | null;
  member: {
    id: number;
    name: string;
  } | null;
};
