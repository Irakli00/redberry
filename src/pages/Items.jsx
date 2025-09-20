import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Items() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({ queryKey: ["items", page] });

  return <h1>ITEMS</h1>;
}

export default Items;
