import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem, Typography } from "@mui/material";

import Layout from "components/Layout";
import client from "api/client";

const AddBatch = () => {
  const navigate = useNavigate();

  const createBatch = async (values, formikActions) => {
    const res = await client.post("/batches", {
      ...values,
    });

    if (res.data.success) {
      console.log("Batch created successfully");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  //    {
  //        "name" : "A1",
  //        "level" : 1,
  //        "whatsappGroupLink" : "https://chat.whatsapp.com/GjHUKc0aMhQ25kElerVMrS",
  //        "zoomLink" : "https://us02web.zoom.us/j/82159279189?pwd=bWlGeU9oN253MThiRVUweE9HN0ZBUT08",
  //        "startDate" : "2022-11-03",
  //        "endDate" : "2022-11-18"
  //    }

  const formik = useFormik({
    initialValues: {
      name: "",
      level: "",
      whatsappGroupLink: "",
      zoomLink: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      level: Yup.number().required("Level is required"),
    }),
    onSubmit: (values, formikActions) => {
      createBatch(values, formikActions);
      navigate("/batches");
    },
  });

  return (
    <Layout title="Add Batch">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            label="Name *"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
            variant="outlined"
            sx={{ minWidth: "400px" }}
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
            error={Boolean(
              formik.touched.whatsappGroupLink &&
                formik.errors.whatsappGroupLink
            )}
            helperText={
              formik.touched.whatsappGroupLink &&
              formik.errors.whatsappGroupLink
            }
            label="Whatsapp Group Link *"
            margin="normal"
            name="whatsappGroupLink"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.whatsappGroupLink}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.zoomLink && formik.errors.zoomLink)}
            helperText={formik.touched.zoomLink && formik.errors.zoomLink}
            label="Zoom Link *"
            margin="normal"
            name="zoomLink"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.zoomLink}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            id="outlined-select-zoomLink"
          />
          <br />

          <TextField
            error={Boolean(formik.touched.startDate && formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            label="Start Date *"
            margin="normal"
            name="startDate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="date"
            value={formik.values.startDate}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.endDate && formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            label="End Date *"
            margin="normal"
            name="endDate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="date"
            value={formik.values.endDate}
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
            Add Batch
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AddBatch;
