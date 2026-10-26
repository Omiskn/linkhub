import { authService } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "./useVerifiyEmail";
import { useNavigate } from "react-router-dom";

export function useGoogleLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: googleLogin, isPending: isLoading } = useMutation({
    mutationFn: (idToken: string) => authService.googleLogin(idToken),
    onSuccess: (data) => {
      toast.success("Welcome back!");
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }
      if (data?.data?.user) {
        queryClient.setQueryData(["user"], data.data.user);
      }
      navigate("/dashboard", { replace: true });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error.response?.data?.message || "Google sign-in failed. Please try again."
      );
    },
  });

  return { googleLogin, isLoading };
}
