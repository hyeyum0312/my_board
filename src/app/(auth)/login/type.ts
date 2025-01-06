export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  access_token: string;
}
