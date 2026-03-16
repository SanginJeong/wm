import { backendInstance } from "./instance";
import { SignupRequest, SignupResponse } from "@wondermall/types";

export const postSignup = async (req: SignupRequest): Promise<SignupResponse> => {
  const { data } = await backendInstance.post<SignupResponse>("/auth/signup", req);
  return data;
};
