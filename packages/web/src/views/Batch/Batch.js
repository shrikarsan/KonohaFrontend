import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Layout from "components/Layout";
import client from "api/client";

const Batch = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const [batch, setBatch] = useState();

  useEffect(() => {
    getBatch(batchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBatch = async (batchId) => {
    await client
      .get(`/batches/${batchId}`)
      .then((response) => {
        setBatch(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all batches");
      });
  };

  const handleDelete = async () => {
    const res = await client.delete(`/batches/${batchId}`);

    console.log(res.data.message);
    navigate("/batches");
  };

  const Info = ({ detail, value }) => {
    if (value !== "") {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            <Typography sx={{ fontWeight: "bold" }}>{detail}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{value}</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout title="Batch">
      <Typography sx={{ fontWeight: "bold" }}>Batch Information</Typography>
      <br />
      {batch && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: "50%", minWidth: 500 }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <Info detail="Batch ID" value={batch.batchId} />
                <Info detail="Name" value={batch.name} />
                <Info detail="Level" value={batch.level} />
                <Info
                  detail="WhatsApp Group Link"
                  value={
                    <a href={batch.whatsappGroupLink}>
                      {batch.whatsappGroupLink}
                    </a>
                  }
                />
                <Info
                  detail="Zoom Link"
                  value={<a href={batch.zoomLink}>{batch.zoomLink}</a>}
                />
                <Info
                  detail="Start Date"
                  value={batch.startDate.toString().substring(0, 10)}
                />
                <Info
                  detail="End Date"
                  value={batch.endDate.toString().substring(0, 10)}
                />
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <Button
            variant="contained"
            href={`/batch/update/${batchId}`}
            endIcon={<EditRoundedIcon />}
            sx={{ backgroundColor: "#0466c8" }}
          >
            Update Batch
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              window.confirm("Are you sure you want to delete this batch?") &&
                handleDelete();
            }}
            endIcon={<DeleteRoundedIcon />}
            sx={{ backgroundColor: "#ef233c", margin: 1 }}
          >
            Delete Batch
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Batch;
