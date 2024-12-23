import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (ascending)" },
          { value: "regularPrice-desc", label: "Sort by price (descending)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (ascending)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (descending)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
