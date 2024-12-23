import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

/*eslint-disable react/prop-types */
function Stats({ bookings, confirmedStays, numDays = {}, cabinCount = {} }) {
  const numBookings = bookings.length;

  const sales = formatCurrency(
    bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  );

  const checkins = confirmedStays.length;

  // num checkin nights / all available nights
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="occcupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
