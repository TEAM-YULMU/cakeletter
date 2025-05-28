# 🎂 CakeLetter - 레터링 케이크 주문, 한 플랫폼에서 끝내자!

![Image](https://github.com/user-attachments/assets/c5cb552a-a875-4647-9007-2c608380f256)

<br>

## Intro

사용자는 인스타그램·네이버·오픈채팅을 전전할 필요 없이, 한 곳에서 원하는 레터링 케이크를 쉽고 빠르게 찾고 주문할 수 있습니다.  
사장님은 상품 등록부터 주문 접수까지 복잡한 과정을 하나의 플랫폼, CakeLetter에서 간편하게 관리할 수 있습니다.

<br>

## Features

✅ 사용자 (유저)

- 🔎 지역 기반 가게 필터링 (시/도, 시/군/구)
- 🧁 가게별 상품 목록 및 상세 정보 조회
- 📦 원하는 상품 옵션 선택 및 주문 진행
- 🧭 직관적인 UI로 매장 탐색 → 상세 페이지 → 주문 흐름

✅ 사장님 (사이드)

- 🧾 상품 등록 및 수정 (옵션 항목 포함)
- 🖼 이미지 업로드 및 S3 저장
- 📋 채팅을 통한 주문 요청 확인 및 처리

<br>

## Tech Stack

| 구분             | 사용 기술                                         |
| ---------------- | ------------------------------------------------- |
| **Frontend ❤️**  | Next.js 15, TypeScript 4, Tailwind CSS, Shadcn/ui |
| **Backend 🧡**   | Next.js API Routes, Prisma ORM, MySQL             |
| **Storage 💛**   | AWS S3 (이미지 업로드)                            |
| **Dev Tools 💚** | Yarn, Husky, ESLint, Prettier                     |

<br>

## Developers

<div align="center">

|                                                                **박지환**                                                                |                                                                 **손혜정**                                                                 |                                                                   **박승희**                                                                    |                                                              **김효준**                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/77378301?v=4" height=150 width=150> <br/> @jhpark0888](https://github.com/jhpark0888) | [<img src="https://avatars.githubusercontent.com/u/74630428?v=4" height=150 width=150> <br/> @HyejeongSon](https://github.com/HyejeongSon) | [<img src="https://avatars.githubusercontent.com/u/159995296?v=4" height=150 width=150> <br/> @seunghui-park](https://github.com/seunghui-park) | [<img src="https://avatars.githubusercontent.com/u/66195226?v=4" height=150 width=150> <br/> @Hyo-joon](https://github.com/Hyo-joon) |
|               상품 등록 페이지,API 구현<br>상품 수정 페이지,API 구현<br>상품 상세 페이지,API 구현<br>상품 목록 페이지 구현               |                 ERD 설계 및 prisma 세팅<br>헤더 및 네비게이션바<br>로그인 및 회원가입 기능<br>채팅 crud<br>middleware 처리                 |                              디자인<br>프로젝트 초기 세팅<br>가게 목록 페이지,API 구현<br>가게 상세 페이지,API구현                              |                                    ERD 설계<br>소켓 서버 구축<br>채팅 crud 구현<br>발표 자료 제작                                    |

</div>

<br>

## 기능 설명

### 회원가입

- zod 라이브러리 사용한 유효성 검증
- 일반 유저 회원가입, 사장님 회원가입 권한(role) 부여

### 로그인

- 로그인 정보가 유효한 경우, JWT 생성 후 HttpOnly 쿠키에 저장하여 세션 유지

### 상품 관리

사장님이 자신이 판매할 케이크를 등록, 수정, 삭제할 수 있는 기능입니다.

1. :케이크: 상품 생성

- 상품 이름, 설명, 가격, 추가 옵션 설정 가능
- 상품 이미지 최대 5장까지 업로드 가능 (s3 업로드)

2. :컵케익: 상품 수정

- 상품 이름, 설명, 가격, 추가 옵션, 이미지 수정 가능

3. :x: 상품 삭제

- 기존에 만든 상품 삭제

### 채팅 기능

Next.js App Router + Prisma + Socket.IO 기반의 1:1 실시간 채팅 기능입니다.

1. 🏠 채팅방 생성

- `/api/chats` API를 통해 채팅방 생성 요청
- 일반 사용자와 사장님 간 1:1 채팅 허용
- 기존 채팅방이 있으면 해당 방으로 이동

2. ✉️ 채팅 기능

- 소켓 연결 후 `onJoinRoom(roomId)` 이벤트로 채팅방 입장
- `onSend` 이벤트로 메시지 전송 → 서버에서 DB 저장 후 `onReceive`로 브로드캐스트
- 채팅 내용은 실시간으로 화면에 렌더링
- 메시지 발신자에 따라 말풍선 방향을 다르게 표시

3. 📜 채팅 리스트

- 사용자가 참여 중인 채팅방 목록 조회
- 각 채팅방에는 마지막 메시지 내용과 전송 시간 표시
- 상대방(또는 사장님)의 이름과 함께 표시

4. 🚪채팅방 나가기

- 채팅방 나가기 버튼 클릭 시 방에서 나가기 처리 예정
- 추후 `chatInvisibleTo` 필드를 활용한 soft-delete 방식 적용 계획

<table>
 <tr>
  <td align="center">페이지명</td>
  <td align="center">동작 화면</td>
 </tr>
 <tr>
  <td>회원가입 페이지</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/e5b92ca2-096c-4ad7-829b-4a054bdd651b" />
  </td>
  </tr>
 <tr>
<td>로그인 페이지</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/763d4f09-dc6e-4399-bd6e-b1d527fb4a76" />
  </td>
</tr>
<tr>
<td>상품 페이지</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/e00468e9-15a3-4b9b-9029-eb1c0f8c359d" />
</td>
</tr>
<tr>
<td>상품 추가 페이지</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/f66ae06b-e155-4c95-a761-13f9b01bb90d" />
</td>
</tr>
<tr>
<td>상품 수정 페이지</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/2250aa66-a36c-468c-9967-c9a916d4df2c" />
</td>
</tr>
<tr>
<td>상품 삭제</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/a4a83114-2b3a-4892-a131-4c390214da31" />
</td>
</tr>
<tr>
<td>일반유저 채팅 페이지</td>
  <td align="center">
  <img src="https://github.com/user-attachments/assets/4b172aee-6a90-4c91-8e98-4de2bfb9e3da" />
  
</td>
</tr><tr>
<td>사장님 채팅 페이지</td>
  <td align="center">
 <img src="https://github.com/user-attachments/assets/4c3e2d5d-4288-4d57-a1cf-172866c5d0e7" />
</td>
</tr>
<tr>
<td>채팅방 나가기

</td>
  <td align="center">
 <img src="https://github.com/user-attachments/assets/9441aee0-3b61-42eb-bb93-ba5fc3003211" />
</td>
</tr>
</table>

### ERD

![Image](https://github.com/user-attachments/assets/00b65be0-9c13-4f4c-99ad-caff5d448ae3)

### Directory Structure

```
app
│
├─(auth)
│  │  layout.tsx
│  │
│  ├─login
│  │      page.tsx
│  │
│  └─signup
│      ├─owner
│      │      page.tsx
│      │
│      └─user
│              page.tsx
│
├─(user)
│  │  layout.tsx
│  │  page.tsx
│  │
│  └─store
│      └─[storeId]
│          │  page.tsx
│          │
│          └─product
│              │  page.tsx
│              │
│              └─[productId]
│                      page.tsx
│
├─chat
│  │  layout.tsx
│  │  page.tsx
│  │
│  └─[chatId]
│          page.tsx
│
└─owner
    │  layout.tsx
    │  page.tsx
    │
    └─product
        ├─new
        │      page.tsx
        │
        └─[productId]
            └─edit
                    page.tsx
```
