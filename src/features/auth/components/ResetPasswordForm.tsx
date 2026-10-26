import { FaLock } from "react-icons/fa";
import Button from "../../../ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/ui/FormField";
import { useResetPassword } from "../hooks/useResetPassword";
import { Spinner } from "@/components/ui/Spinner";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const resetSchema = z
  .object({
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string().min(10, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  if (!token) {
    return (
      <div className="flex flex-col items-center text-center space-y-4 max-w-sm mt-4 p-4 rounded-xl border bg-destructive/10 text-destructive">
        <AlertCircle className="size-10" />
        <h3 className="text-lg font-semibold">Missing Reset Token</h3>
        <p className="text-sm">
          No valid password reset token was found in the link. Please request a new password reset.
        </p>
        <Link
          to="/forgot_password"
          className="text-sm font-medium underline mt-2"
        >
          Request new reset link
        </Link>
      </div>
    );
  }

  function onSubmit(data: ResetFormData) {
    if (!token) return;
    resetPassword({
      token,
      newPassword: data.password,
    });
  }

  return (
    <form
      className="space-y-4 flex flex-col w-full max-w-sm items-center mt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        icon={FaLock}
        type="password"
        placeholder="New password (min 10 characters)"
        error={errors.password}
        disabled={isLoading}
        {...register("password")}
      />

      <FormField
        icon={FaLock}
        type="password"
        placeholder="Confirm new password"
        error={errors.confirmPassword}
        disabled={isLoading}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="w-full sm:w-[70%] md:w-[50%] hover:scale-[1.02] transition flex items-center justify-center mt-2"
      >
        {isLoading ? <Spinner /> : "Update Password"}
      </Button>

      <Link
        to="/login"
        className="text-sm text-muted-foreground hover:text-foreground underline transition mt-2"
      >
        Cancel and return to login
      </Link>
    </form>
  );
}

export default ResetPasswordForm;
