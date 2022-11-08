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

const Student = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [student, setStudent] = useState();

  useEffect(() => {
    getStudent(studentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStudent = async (studentId) => {
    await client
      .get(`/students/${studentId}`)
      .then((response) => {
        setStudent(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all students");
      });
  };

  const handleDelete = async () => {
    const res = await client.post("/delete-student", {
      id: studentId,
    });
    if (res.data.success) {
      console.log(res.data.message);
      navigate("/students");
    } else {
      console.log("Delete not successful");
    }
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
    <Layout title="Student">
      <Typography sx={{ fontWeight: "bold" }}>Student Information</Typography>
      <br />
      {student && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: "50%", minWidth: 500 }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <Info detail="Student ID" value={student.studentId} />
                <Info detail="First Name" value={student.firstName} />
                <Info detail="Last Name" value={student.lastName} />
                <Info detail="Email" value={student.email} />
                <Info detail="WhatsApp Number" value={student.whatsappNumber} />
                <Info detail="Level" value={student.level} />
                <Info detail="Batch" value={student.batchId} />
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <Button
            variant="contained"
            href={`/student/update/${studentId}`}
            endIcon={<EditRoundedIcon />}
            sx={{ backgroundColor: "#0466c8" }}
          >
            Update Student
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              window.confirm("Are you sure you want to delete this student?") &&
                handleDelete();
            }}
            endIcon={<DeleteRoundedIcon />}
            sx={{ backgroundColor: "#ef233c", margin: 1 }}
          >
            Delete Student
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Student;
