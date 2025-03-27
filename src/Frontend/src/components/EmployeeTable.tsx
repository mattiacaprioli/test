import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    styled,
    tableCellClasses,
  } from "@mui/material";
  import { Employee } from "../types/Employee";
  
  interface Props {
    employees: Employee[];
    onSort: (key: keyof Employee) => void;
    sortKey: keyof Employee | null;
    sortOrder: "asc" | "desc";
  }
  
  export default function EmployeeTable({ employees, onSort, sortKey, sortOrder }: Props) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell onClick={() => onSort("code")}>
                Code {sortKey === "code" && (sortOrder === "asc" ? "↑" : "↓")}
              </StyledTableHeadCell>
              <StyledTableHeadCell onClick={() => onSort("firstName")}>
                First Name {sortKey === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
              </StyledTableHeadCell>
              <StyledTableHeadCell onClick={() => onSort("lastName")}>
                Last Name {sortKey === "lastName" && (sortOrder === "asc" ? "↑" : "↓")}
              </StyledTableHeadCell>
              <StyledTableHeadCell onClick={() => onSort("address")}>
                Address {sortKey === "address" && (sortOrder === "asc" ? "↑" : "↓")}
              </StyledTableHeadCell>
              <StyledTableHeadCell onClick={() => onSort("email")}>
                Email {sortKey === "email" && (sortOrder === "asc" ? "↑" : "↓")}
              </StyledTableHeadCell>
              <StyledTableHeadCell onClick={() => onSort("phone")}>
                Phone {sortKey === "phone" && (sortOrder === "asc" ? "↑" : "↓")}
              </StyledTableHeadCell>
              <StyledTableHeadCell>Department</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.code}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  {employee.department
                    ? `${employee.department.description} (${employee.department.code})`
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      cursor: "pointer",
      userSelect: "none",
    },
  }));
  