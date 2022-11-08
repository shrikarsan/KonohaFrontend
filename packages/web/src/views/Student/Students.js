import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Layout from "components/Layout";
import { Typography } from "@mui/material";

import StyledTableCell from "components/StyledTableCell";

import { useNavigate } from "react-router-dom";
import client from "api/client";

function createData(id, firstName, lastName, email, role) {
  return { id, firstName, lastName, email, role };
}

const rowHeaders = [
  "Student ID",
  "First Name",
  "Last Name",
  "Email",
  "WhatsApp Number",
  "Level",
  "Batch",
];
const rows = [];

const Students = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [allStudents, setAllStudents] = useState();

  const getAllStudents = async () => {
    await client
      .get("/students")
      .then((response) => {
        setAllStudents(response);
        console.log(response);
      })
      .catch((err) => {
        console.log("Unable to get all students");
      });
  };

  return (
    <Layout title="Students">
      <Typography>List of users in the factory</Typography>
      <br />
      <Button
        variant="contained"
        href="students/add"
        endIcon={<AddRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Add Student
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {rowHeaders.map((item) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
              <StyledTableCell colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody>
            {(allStudents !== undefined ? allStudents.data : []).map((row) => (
              <TableRow key={row.studentId}>
                <TableCell component="th" scope="row">
                  {row.studentId}
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.whatsappNumber}</TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.batchId}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate(`/student/${row.studentId}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Students;
