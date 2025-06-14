export const BASE_URL = "/";

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGN_UP_USER: "/signup/user",
  SIGN_UP_OWNER: "/signup/owner",
};

export const PUBLIC_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.SIGN_UP_USER, AUTH_ROUTES.SIGN_UP_OWNER];

export const CHAT_ROUTES = {
  ROOMS: "/chat",
};

export const PROTECTED_ROUTES = {
  CHAT: "/chat",
  OWNER: "/owner",
};
