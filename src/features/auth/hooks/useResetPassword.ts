import { authService } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "./useVerifiyEmail";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const navigate = useNavigate();

  const {
    mutate: resetPassword,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      authService.resetPassword(data),
    onSuccess: (data) => {
      toast.success(
        data?.message || "Password updated successfully! Please log in."
      );
      navigate("/login", { replace: true });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error.response?.data?.message ||
          "Password reset failed. Link may be expired or invalid."
      );
    },
  });

  return { resetPassword, isLoading, isSuccess };
}
