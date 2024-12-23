import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "../check-in-out/useCheckout";

/*eslint-disable react/prop-types */
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();

  return (
    <Button
      onClick={() => checkout(bookingId)}
      size="small"
      disabled={isCheckingout}
    >
      {!isCheckingout ? "Check out" : <SpinnerMini />}
    </Button>
  );
}

export default CheckoutButton;
