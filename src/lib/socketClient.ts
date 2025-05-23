//클라이언트측 소켓
"use client";
import { io } from "socket.io-client";
export const socket = io();

//tsx 파일에서 가져가서 함수와 hooks 를 트기러할 수 있음
