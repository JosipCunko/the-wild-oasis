import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

/*Data which is filtered, sorted or paginated is fetched from the server, and not transformed in the client. Considering that data is now prefetched, user won't notice it*/
export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //FIlTER
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "eq" };

  //SORT
  const sortByPrev = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByPrev.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {}, //Data will initially be undefined, this trick is pretty usefull
    error,
  } = useQuery({
    //New entry in query cache is created
    //Refetched based on filter object, like dependency array
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  //So it doesnt load page which doesnt exist (page + 1)
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //Also, prefetch previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
