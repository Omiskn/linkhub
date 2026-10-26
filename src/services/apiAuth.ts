import { api, apiWithToken } from "@/lib/axios";
import type { LoginDTO, RegisterDTO, UpdateUserDTO } from "@/types/user";

export const authService = {
  register: async (data: RegisterDTO) => {
    const { data: res } = await api.post("/users/register", data);
    return res;
  },

  login: async (data: LoginDTO) => {
    const { data: res } = await api.post("/users/login", data);
    return res;
  },

  googleLogin: async (idToken: string) => {
    const { data: res } = await api.post("/users/google", { idToken });
    return res;
  },


  verifyEmail: async (token: string) => {
    const { data: res } = await api.get("/users/verify-email", {
      params: { token },
    });
    return res;
  },

  forgotPassword: async (email: string) => {
    const { data: res } = await api.post("/users/forgot-password", { email });
    return res;
  },

  resetPassword: async (data: { token: string; newPassword: string }) => {
    const { data: res } = await api.post("/users/reset-password", data);
    return res;
  },


  updateMe: async (data: UpdateUserDTO) => {
    const formData = new FormData();

    formData.append("username", data.username);

    if (data.display_name) {
      formData.append("display_name", data.display_name);
    }

    if (data.bio) {
      formData.append("bio", data.bio);
    }

    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }
    console.log(formData);

    const { data: res } = await apiWithToken.patch("/users/me", formData);
    return res;
  },

  getMe: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const { data: res } = await api.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  },

  getPublicProfile: async (username: string) => {
    const { data: res } = await api.get(`/users/public-profile/${username}`);
    return res;
  },
};
