import React from "react"
import { Navigate } from "react-router-dom"
// other page components...
const RegisterThesis = React.lazy(() => import("../../pages/lecturer/registerThesis"))
const Profile = React.lazy(() => import("../../pages/lecturer/profile"))
const ApproveThesis = React.lazy(() => import("../../pages/management/approveThesis"))
const ManageThesis = React.lazy(() => import("../../pages/lecturer/manageThesis"))
const AssignedLecturer = React.lazy(() => import("../../pages/management/assignedLecturer"))
const ManageStudentSubmit = React.lazy(() => import("../../pages/lecturer/manageStudentSubmit"))
const ManageTask = React.lazy(() => import("../../pages/lecturer/manageTask"))
const routes = [
    // other mappings ...
    { path: "/management", element: <Navigate to="/management/register-thesis" replace={true} /> },
    { path: "/management/register-thesis", element: <RegisterThesis /> },
    { path: "/management/manage-thesis", element: <ManageThesis /> },
    { path: "/management/profile", element: <Profile /> },
    { path: "/management/approve-thesis", element: <ApproveThesis /> },
    { path: "/management/assigned-lecturer", element: <AssignedLecturer /> },
    { path: "/management/manage-submit", element: <ManageStudentSubmit /> },
    { path: "/management/manage-task", element: <ManageTask /> },
]

export default routes