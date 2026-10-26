import { useEffect, useRef } from "react";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { Spinner } from "@/components/ui/Spinner";

export default function Socials() {
  const { googleLogin, isLoading } = useGoogleLogin();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not configured in .env");
      return;
    }

    const interval = setInterval(() => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        clearInterval(interval);
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: { credential: string }) => {
              if (response?.credential) {
                googleLogin(response.credential);
              }
            },
          });

          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            shape: "pill",
            text: "continue_with",
            width: 260,
          });
        } catch (err) {
          console.error("Google Sign-In initialization failed:", err);
        }
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [googleLogin]);

  return (
    <div className="flex flex-col items-center justify-center my-2 w-full">
      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Spinner />
          <span>Signing in with Google...</span>
        </div>
      ) : (
        <div ref={googleBtnRef} className="min-h-[40px] flex justify-center" />
      )}
    </div>
  );
}
