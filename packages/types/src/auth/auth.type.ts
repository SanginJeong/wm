export type SignupRequest = {
  email: string;
  password: string;
};

export type SignupResponse = {
  success: boolean;
  data: {
    accessToken: string;
  };
};
