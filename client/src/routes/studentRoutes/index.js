import React from "react"
import { Navigate } from "react-router-dom"
// other page components...
const RegisterThesis = React.lazy(() => import("../../pages/student/registerThesis"))
const Profile = React.lazy(() => import("../../pages/student/profile"))
const ManageThesis = React.lazy(() => import("../../pages/student/manageThesis"))

const routes = [
    // other mappings ...
    { path: "/student", element: <Navigate to="/student/register-thesis" replace={true} /> },
    { path: "/student/manage-thesis", element: <ManageThesis /> },
    { path: "/student/register-thesis", element: <RegisterThesis /> },
    { path: "/student/profile", element: <Profile /> },
]

export default routes