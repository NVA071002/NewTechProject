import './App.css';

import axios from "axios"
import guestRoutes from './routes/guestRoutes';
import studentRoutes from "./routes/studentRoutes"
import lecturerRoutes from "./routes/lecturerRoutes"
import adminRoutes from "./routes/adminRoutes"
import managementRoutes from "./routes/managementRoutes"
import Layout from './components/layout/Layout';
import PageNotFound from './pages/404';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './context/RequireAuth';
function App() {
  const ROLES = {
    'Guest': "Guest",
    'Student': "Student",
    'Lecturer': "Lecturer",
    'Admin': "Admin",
    'Management': "Management"
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        {guestRoutes?.map((router, index) => (
          <Route path={router.path} element={router?.element} key={index} />
        ))}
        <Route element={<RequireAuth allowedRoles={ROLES.Student} />}>
          {studentRoutes?.map((router, index) => (
            <Route path={router.path} element={router?.element} key={index} />
          ))}
        </Route>
        <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
          {adminRoutes?.map((router, index) => (
            <Route path={router.path} element={router?.element} key={index} />
          ))}
        </Route>
        <Route element={<RequireAuth allowedRoles={ROLES.Lecturer} />}>
          {lecturerRoutes?.map((router, index) => (
            <Route path={router.path} element={router?.element} key={index} />
          ))}
        </Route>
        <Route element={<RequireAuth allowedRoles={ROLES.Management} />}>
          {managementRoutes?.map((router, index) => (
            <Route path={router.path} element={router?.element} key={index} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
