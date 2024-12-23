import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    //Received bookingId when passed in mutation function (checkin)
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    //Receives data - value that is return from the mutation function
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      //Invalidate all the queries that are currenlty active on the page
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingin };
}
