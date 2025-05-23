export const BASE_URL = "/";

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGN_UP_USER: "/signup/user",
  SIGN_UP_OWNER: "/signup/owner",
};

export const CHAT_ROUTES = {
  CONVERSATIONS: "/chat",
};

export const PUBLIC_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.SIGN_UP_USER, AUTH_ROUTES.SIGN_UP_OWNER];
