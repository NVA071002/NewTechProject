import React from "react"
import { Navigate } from "react-router-dom"
// other page components...
const RegisterThesis = React.lazy(() => import("../../pages/lecturer/registerThesis"))
const Profile = React.lazy(() => import("../../pages/lecturer/profile"))
const ManageThesis = React.lazy(() => import("../../pages/lecturer/manageThesis"))
const AssignedLecturer = React.lazy(() => import("../../pages/lecturer/assignedLecturer"))
const ManageStudentSubmit = React.lazy(() => import("../../pages/lecturer/manageStudentSubmit"))
const ManageTask = React.lazy(() => import("../../pages/lecturer/manageTask"))
const routes = [
    // other mappings ...
    { path: "/lecturer", element: <Navigate to="/lecturer/register-thesis" replace={true} /> },
    { path: "/lecturer/manage-thesis", element: <ManageThesis /> },
    { path: "/lecturer/register-thesis", element: <RegisterThesis /> },
    { path: "/lecturer/profile", element: <Profile /> },
    { path: "/lecturer/assigned-thesis", element: <AssignedLecturer /> },
    { path: "/lecturer/manage-submit", element: <ManageStudentSubmit /> },
    { path: "/lecturer/manage-task", element: <ManageTask /> },
]

export default routes