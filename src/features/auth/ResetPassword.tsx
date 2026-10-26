import AuthLayout from "../../layouts/AuthLayout";
import AuthLeft from "./components/AuthLeft";
import ResetPasswordForm from "./components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <AuthLeft
        title="Reset Password"
        message="Enter your new password below"
        showSocial={false}
        formType={<ResetPasswordForm />}
      />
    </AuthLayout>
  );
}
