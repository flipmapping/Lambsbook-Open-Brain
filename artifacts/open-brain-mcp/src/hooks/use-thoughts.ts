import { useQueryClient } from "@tanstack/react-query";
import { 
  useListThoughts as useOrvalListThoughts,
  useCreateThought as useOrvalCreateThought,
  useUpdateThought as useOrvalUpdateThought,
  useDeleteThought as useOrvalDeleteThought,
  useListCategories as useOrvalListCategories,
  getListThoughtsQueryKey,
  getListCategoriesQueryKey,
  getGetThoughtQueryKey,
  useGetThought
} from "@workspace/api-client-react";

// Wrap queries simply to export from one place
export const useListThoughts = useOrvalListThoughts;
export const useListCategories = useOrvalListCategories;
export const useThought = useGetThought;

// Wrap mutations to automatically invalidate queries
export function useCreateThought() {
  const queryClient = useQueryClient();
  return useOrvalCreateThought({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListThoughtsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
      },
    },
  });
}

export function useUpdateThought() {
  const queryClient = useQueryClient();
  return useOrvalUpdateThought({
    mutation: {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: getListThoughtsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetThoughtQueryKey(variables.id) });
        queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
      },
    },
  });
}

export function useDeleteThought() {
  const queryClient = useQueryClient();
  return useOrvalDeleteThought({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListThoughtsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
      },
    },
  });
}
