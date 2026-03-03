export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type Profile = {
   id: number;
  name: string;
  email: string;
  headline: string;
  avatarUrl: string;
}
