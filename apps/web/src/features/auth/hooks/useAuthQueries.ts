import { useMutation } from "@tanstack/react-query";
import { postSignup } from "@wondermall/api";

export const usePostSignup = () =>
  useMutation({
    mutationFn: postSignup,
    onSuccess: () => {},
    onError: () => {},
  });
