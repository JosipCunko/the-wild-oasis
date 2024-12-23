import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-asc", label: "Sort by date (ascending)" },
          { value: "startDate-desc", label: "Sort by date (descending)" },
          { value: "totalPrice-asc", label: "Sort by amount (ascending)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (descending)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
