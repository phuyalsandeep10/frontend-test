export interface User {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
export interface VerifyEmailpayload {
  token: string;
  email: string;
}
export interface ResetPasswordpayload {
  new_password: string;
  old_password: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ForgotPasswordVerifyPayload {
  token?: string;
  email?: string;
  new_password: string;
  confirm_password: string;
}
export interface verify2FaPayload {
  token: string;
}
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
