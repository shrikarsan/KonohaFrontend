import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Sample from "views/Sample";

import Dashboard from "views/Dashboard";

import Students from "views/Student/Students";
import Student from "views/Student/Student";
import AddStudent from "views/Student/AddStudent";
import UpdateStudent from "views/Student/UpdateStudent";

import Batches from "views/Batch/Batches";
import Batch from "views/Batch/Batch";
import AddBatch from "views/Batch/AddBatch";
import UpdateBatch from "views/Batch/UpdateBatch";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Batches />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/student/update/:studentId" element={<UpdateStudent />} />
        <Route path="/student/:studentId" element={<Student />} />

        <Route path="/batches" element={<Batches />} />
        <Route path="/batches/add" element={<AddBatch />} />
        <Route path="/batch/update/:batchId" element={<UpdateBatch />} />
        <Route path="/batch/:batchId" element={<Batch />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
