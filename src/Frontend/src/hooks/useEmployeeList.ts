import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";

export function useEmployeeList(searchText: string) {
  const [list, setList] = useState<Employee[]>([]);
  const [sortKey, setSortKey] = useState<keyof Employee | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("/api/employees/list")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((e: Employee) => {
          const text = searchText.toLowerCase();
          return (
            e.firstName.toLowerCase().includes(text) ||
            e.lastName.toLowerCase().includes(text) ||
            e.email.toLowerCase().includes(text)
          );
        });
        setList(filtered);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [searchText]);

  const handleSort = (key: keyof Employee) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedList = [...list].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return {
    sortedList,
    handleSort,
    sortKey,
    sortOrder,
  };
}
