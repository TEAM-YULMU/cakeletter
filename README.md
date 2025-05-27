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
|               상품 등록 페이지,API 구현<br>상품 수정 페이지,API 구현<br>상품 상세 페이지,API 구현<br>상품 목록 페이지 구현               |                                ERD 설계<br>로그인 및 회원가입 기능 구현<br>채팅 crud 구현<br>미들웨어 설정                                 |                              디자인<br>프로젝트 초기 세팅<br>가게 목록 페이지,API 구현<br>가게 상세 페이지,API구현                              |                                    ERD 설계<br>소켓 서버 구축<br>채팅 crud 구현<br>발표 자료 제작                                    |

</div>

<br>

## 기능 설명

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
