import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem, Typography } from "@mui/material";

import Layout from "components/Layout";
import client from "api/client";

const AddClass = () => {
  const navigate = useNavigate();

  const createClass = async (values, formikActions) => {
    const res = await client.post("/classes", {
      ...values,
    });

    if (res.data.success) {
      console.log("Class created successfully");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      whatsappNumber: "",
      level: "",
      batchId: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email!").required("Email is required"),
      whatsappNumber: Yup.string().required("WhatsApp Number is required"),
    }),
    onSubmit: (values, formikActions) => {
      createClass(values, formikActions);
      navigate("/classes");
    },
  });

  return (
    <Layout title="Add Class">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
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
          />
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
            Add Class
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AddClass;
