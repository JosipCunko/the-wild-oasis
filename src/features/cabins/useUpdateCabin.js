import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createORUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    //It needs to be an object for some reason - maybe because we are passing more than one argument
    mutationFn: ({ newCabinData, id }) => createORUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating };
}
