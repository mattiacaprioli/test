import {
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useEmployeeList } from "../hooks/useEmployeeList";
import EmployeeTable from "../components/EmployeeTable";
import { Employee } from "../types/Employee";

export default function EmployeeListPage() {
  const [searchText, setSearchText] = useState("");
  const { sortedList, handleSort, sortKey, sortOrder } = useEmployeeList(searchText);

  const convertToXml = (employees: Employee[]) => {
    const xmlRows = employees.map((e) => `
      <Employee>
        <Id>${e.id}</Id>
        <Code>${e.code}</Code>
        <FirstName>${e.firstName}</FirstName>
        <LastName>${e.lastName}</LastName>
        <Address>${e.address}</Address>
        <Email>${e.email}</Email>
        <Phone>${e.phone}</Phone>
        <Department>
          <Code>${e.department?.code || ""}</Code>
          <Description>${e.department?.description || ""}</Description>
        </Department>
      </Employee>
    `);

    return `<?xml version="1.0" encoding="UTF-8"?>
<Employees>
  ${xmlRows.join("")}
</Employees>`;
  };

  const downloadXml = () => {
    const xmlContent = convertToXml(sortedList);
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Employees
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, gap: 2 }}>
        <TextField
          label="Search by name or email"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: "60%" }}
        />
        <Button variant="contained" onClick={downloadXml}>
          Export XML
        </Button>
      </Box>

      <EmployeeTable
        employees={sortedList}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    </>
  );
}
