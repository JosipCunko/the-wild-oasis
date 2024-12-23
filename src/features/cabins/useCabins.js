import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], //Identifies each data
    queryFn: getCabins, //Calling getCabins--that data will be stored in the cache
  });

  return { isLoading, cabins, error };
}
