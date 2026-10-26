import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import "./index.css";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/DashboardPage";
import Appearance from "./pages/Appearance";
import Links from "./pages/LinkPage";
import Profile from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


import ProtectedRoute from "./components/ui/ProtectedRoute";
import { ThemeProvider } from "./providers/theme-provider";
// import { ThemeColorProvider } from "./providers/Color-theme-Provider";
// import { ThemeFontProvider } from "./providers/Font-theme-provider";
// import { ThemeBorderProvider } from "./providers/Border-theme-Provider";
import AppearanceProvider from "./providers/AppearanceProvider";
import PublicProfilePage from "./pages/PublicProfilePage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        {/* <ThemeColorProvider>
          <ThemeFontProvider>
            <ThemeBorderProvider> */}
        <AppearanceProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/links" element={<Links />} />
                  <Route path="/dashboard/profile" element={<Profile />} />
                  <Route
                    path="/dashboard/appearance"
                    element={<Appearance />}
                  />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route
                path="/reset_password"
                element={<ResetPasswordPage />}
              />
              <Route path="/verify_email" element={<VerifyEmailPage />} />

              <Route
                path="/public_profile/:username"
                element={<PublicProfilePage />}
              />
            </Routes>
          </BrowserRouter>
        </AppearanceProvider>
        {/* </ThemeBorderProvider>
          </ThemeFontProvider>
        </ThemeColorProvider> */}
      </ThemeProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-50)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
