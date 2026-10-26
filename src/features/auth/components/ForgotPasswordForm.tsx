import { MdEmail } from "react-icons/md";
import Button from "../../../ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/ui/FormField";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Spinner } from "@/components/ui/Spinner";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

function ForgotPasswordForm() {
  const { forgotPassword, isLoading, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  function onSubmit(data: ForgotFormData) {
    forgotPassword(data.email);
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center space-y-4 max-w-sm mt-4 p-4 rounded-xl border bg-card">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="text-lg font-semibold">Check Your Email</h3>
        <p className="text-sm text-muted-foreground">
          If an account exists with that email address, we've sent you a link to reset your password. The link expires in 1 hour.
        </p>
        <Link
          to="/login"
          className="text-sm text-primary hover:underline font-medium mt-2"
        >
          &larr; Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      className="space-y-6 flex flex-col w-full max-w-sm items-center mt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        icon={MdEmail}
        type="email"
        placeholder="Enter your registered email"
        error={errors.email}
        disabled={isLoading}
        {...register("email")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="w-full sm:w-[70%] md:w-[50%] hover:scale-[1.02] transition flex items-center justify-center"
      >
        {isLoading ? <Spinner /> : "Send Reset Link"}
      </Button>

      <Link
        to="/login"
        className="text-sm text-muted-foreground hover:text-foreground underline transition"
      >
        Back to Login
      </Link>
    </form>
  );
}

export default ForgotPasswordForm;
