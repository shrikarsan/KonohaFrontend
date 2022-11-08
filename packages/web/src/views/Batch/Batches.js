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

const rowHeaders = [
  "Batch ID",
  "Name",
  "Level",
  "WhatsApp Group Link",
  "Zoom Link",
  "Start Date",
  "End Date",
];
const rows = [];

const Batches = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getAllBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [allBatches, setAllBatches] = useState();

  const getAllBatches = async () => {
    await client
      .get("/batches")
      .then((response) => {
        setAllBatches(response);
        console.log(response);
      })
      .catch((err) => {
        console.log("Unable to get all batches");
      });
  };

  return (
    <Layout title="Batches">
      <Typography>List of users in the factory</Typography>
      <br />
      <Button
        variant="contained"
        href="batches/add"
        endIcon={<AddRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Add Batch
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
            {(allBatches !== undefined ? allBatches.data : []).map((row) => (
              <TableRow key={row.batchId}>
                <TableCell component="th" scope="row">
                  {row.batchId}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell>
                  <a href={row.whatsappGroupLink}>WP Link</a>
                </TableCell>
                <TableCell>
                  <a href={row.zoomLink}>Zoom Link</a>
                </TableCell>
                <TableCell>
                  {row.startDate.toString().substring(0, 10)}
                </TableCell>
                <TableCell>{row.endDate.toString().substring(0, 10)}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate(`/batch/${row.batchId}`)}
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

export default Batches;
