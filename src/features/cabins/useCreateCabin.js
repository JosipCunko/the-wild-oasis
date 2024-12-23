import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createORUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createORUpdateCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      //Refetch the data with the queryKey so when the created cabin appears in the UI
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
