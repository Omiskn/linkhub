import { authService } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "./useVerifiyEmail";

export function useForgotPassword() {
  const {
    mutate: forgotPassword,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (data) => {
      toast.success(
        data?.message || "Password reset instructions sent to your email."
      );
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error.response?.data?.message || "Failed to submit request. Please try again."
      );
    },
  });

  return { forgotPassword, isLoading, isSuccess };
}
