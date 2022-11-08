import { useEffect } from "react";
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

const UpdateBatch = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBatch(batchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBatch = async (batchId) => {
    try {
      const res = await client.get(`/batches/${batchId}`);

      formik.setFieldValue("batchId", res.data.batchId);
      formik.setFieldValue("name", res.data.name);
      formik.setFieldValue("level", res.data.level);
      formik.setFieldValue("whatsappGroupLink", res.data.whatsappGroupLink);
      formik.setFieldValue("zoomLink", res.data.zoomLink);
      formik.setFieldValue("startDate", res.data.startDate.substring(0, 10));
      formik.setFieldValue("endDate", res.data.endDate.substring(0, 10));
    } catch (err) {
      console.log("Unable to get batch");
    }
  };

  const updateBatch = async (values, formikActions) => {
    const res = await client.put("/batches", {
      ...values,
    });

    if (res.data.success) {
      console.log("Batch updated successfully");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigate(`/batch/${batchId}`);
  };

  const formik = useFormik({
    initialValues: {
      batchId: "",
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
      updateBatch(values, formikActions);
    },
  });

  return (
    <Layout title="Update Batch">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            disabled={true}
            error={Boolean(formik.touched.batchId && formik.errors.batchId)}
            helperText={formik.touched.batchId && formik.errors.batchId}
            label="Batch ID *"
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
            Update Batch
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateBatch;
