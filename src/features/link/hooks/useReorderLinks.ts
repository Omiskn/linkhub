import { linkService } from "@/services/apiLink";
import type { LinkDTO } from "@/types/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "@/features/auth/hooks/useVerifiyEmail";

export function useReorderLinks() {
  const queryClient = useQueryClient();

  const { mutate: reorderLinks, isPending: isReordering } = useMutation({
    mutationFn: (linkIds: number[]) => linkService.reorderLinks(linkIds),
    onMutate: async (newOrderIds: number[]) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });
      const previousLinks = queryClient.getQueryData<LinkDTO[]>(["links"]);

      if (previousLinks) {
        const linkMap = new Map(previousLinks.map((l) => [l.link_id, l]));
        const optimistic = newOrderIds
          .map((id, index) => {
            const link = linkMap.get(id);
            return link ? { ...link, position: index } : null;
          })
          .filter(Boolean) as LinkDTO[];

        queryClient.setQueryData(["links"], optimistic);
      }

      return { previousLinks };
    },
    onError: (error: AxiosError<ApiError>, _variables, context) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(["links"], context.previousLinks);
      }
      toast.error(
        error.response?.data?.message || "Failed to persist link reordering."
      );
    },
    onSuccess: (data) => {
      toast.success("Links reordered successfully!");
      if (data?.data) {
        queryClient.setQueryData(["links"], data.data);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return { reorderLinks, isReordering };
}
