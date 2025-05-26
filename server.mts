import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { prisma } from "./src/lib/prisma.js";
import { SimpleMember } from "./src/types/socket.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  // 연결이 감지될때마다 트리거
  io.on("connection", (socket) => {
    console.log("소켓 연결 완료 >> ", socket.id);

    socket.on("onJoinRoom", (roomId) => {
      console.log("채팅방 입장 >> ", roomId);
      socket.join(String(roomId));
    });

    socket.on("onSend", async ({ memberId, roomId, chat }) => {
        console.log(memberId, roomId, chat);

        // chat insert 구문
        const chatPromise = prisma.chat.create({
          data: {
            chat,
            member: {
              connect: {
                id: memberId,
              },
            },
            room: {
              connect: {
                id: +roomId,
              },
            },
          },
          select: {
            chat: true,
            createdAt: true,
          },
        });

        // memberId로 member id, name 가져오는 구문
        const memberPromise = prisma.member.findUnique({
          where: {
            id: memberId,
          },
          select: {
            id: true,
            name: true,
          },
        });

        // 회원 정보 조회, 채팅 저장 병렬 실행 (순서 중요: chat → chat.createdAt 필요)
        const [member, savedChat] = await Promise.all([memberPromise, chatPromise]);

        // member 정보와 채팅 내용 브로드캐스트
        socket.to(String(roomId)).emit("onReceive", {
          member: member as SimpleMember,
          chat: savedChat.chat,
          createdAt: savedChat.createdAt,
        });
      });

    // socket.on("image", ({ room, sender, image }) => {
    //   console.log(`이미지 전송 : ${sender} 방번호 : ${room}`);
    //   socket.to(room).emit("image", { sender, image });
    // });
    
    socket.on("disconnect", () => {
      console.log(`유저 떠남${socket.id}`);
    });
  });

  // 메세지를 브로드캐스트
  // 실제로 서버가 포트에서 실행
  httpServer.listen(port, () => {
    console.log(`서버 구동중 http://${hostname}:${port}`);
  });
});