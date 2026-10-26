import { apiWithToken } from "@/lib/axios";
import type { LinkDTO } from "@/types/link";

export const linkService = {
  getLinks: async () => {
    const { data: res } = await apiWithToken.get("/links");
    return res;
  },

  createLink: async (data: LinkDTO) => {
    const { data: res } = await apiWithToken.post("/links", data);

    return res;
  },

  editLink: async (data: Partial<LinkDTO>, editId: number) => {
    const { data: res } = await apiWithToken.patch(`/links/${editId}`, data);

    return res;
  },


  deleteLink: async (linkId: number) => {
    const { data: res } = await apiWithToken.delete(`links/${linkId}`);
    return res;
  },
};
