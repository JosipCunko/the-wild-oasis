import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

//get the current user and stores it in the cache, it will not have to be downloaded each time that is neccessary
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
