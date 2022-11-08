import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Layout from "components/Layout";
import client from "api/client";

const UpdateStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudent(studentId);
    getAllBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStudent = async (studentId) => {
    try {
      const res = await client.get(`/students/${studentId}`);
      console.log(res);
      formik.setFieldValue("studentId", res.data.studentId);
      formik.setFieldValue("firstName", res.data.firstName);
      formik.setFieldValue("lastName", res.data.lastName);
      formik.setFieldValue("email", res.data.email);
      formik.setFieldValue("whatsappNumber", res.data.whatsappNumber);
      formik.setFieldValue("level", res.data.level);
      formik.setFieldValue("batchId", res.data.batchId);
    } catch (err) {
      console.log("Unable to get user");
    }
  };

  const [allBatches, setAllBatches] = useState();

  const getAllBatches = async () => {
    await client
      .get("/batches")
      .then((response) => {
        setAllBatches(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all batches");
      });
  };

  const updateStudent = async (values, formikActions) => {
    const res = await client.put("/students", {
      ...values,
    });
    console.log("Update");

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigate(`/student/${studentId}`);
  };

  const formik = useFormik({
    initialValues: {
      studentId: "",
      firstName: "",
      lastName: "",
      email: "",
      whatsappNumber: "",
      level: "",
      batchId: "",
    },
    validationSchema: Yup.object({
      studentId: Yup.string()
        .min(5, "ID should contain at least 5 characters")
        .required("Student ID is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email!").required("Email is required"),
    }),
    onSubmit: (values, formikActions) => {
      updateStudent(values, formikActions);
    },
  });

  return (
    <Layout title="Update Student">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            disabled={true}
            error={Boolean(formik.touched.studentId && formik.errors.studentId)}
            helperText={formik.touched.studentId && formik.errors.studentId}
            label="Student ID *"
            margin="normal"
            name="studentId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.studentId}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            label="First Name *"
            margin="normal"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.firstName}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            label="Last Name *"
            margin="normal"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.lastName}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Email *"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(
              formik.touched.whatsappNumber && formik.errors.whatsappNumber
            )}
            helperText={
              formik.touched.whatsappNumber && formik.errors.whatsappNumber
            }
            label="WhatsApp Number *"
            margin="normal"
            name="whatsappNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.whatsappNumber}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            id="outlined-select-whatsappNumber"
          />
          <br />

          <TextField
            error={Boolean(formik.touched.level && formik.errors.level)}
            helperText={formik.touched.level && formik.errors.level}
            label="Level *"
            margin="normal"
            name="level"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.level}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.batchId && formik.errors.batchId)}
            helperText={formik.touched.batchId && formik.errors.batchId}
            label="Batch *"
            margin="normal"
            name="batchId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.batchId}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            id="outlined-select-batch"
            select
          >
            {allBatches &&
              allBatches
                .filter((batch) => batch.level === formik.values.level)
                .map((option) => (
                  <MenuItem key={option.batchId} value={option.batchId}>
                    {option.name}
                  </MenuItem>
                ))}
          </TextField>
          <br />
          <br />

          <Button
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ minWidth: "400px", textTransform: "none" }}
            size="large"
            type="submit"
            variant="contained"
          >
            Update Student
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateStudent;
