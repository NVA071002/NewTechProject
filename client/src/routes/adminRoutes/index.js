import React from "react"
import { Navigate } from "react-router-dom"
// other page components...
// const Login = React.lazy(() => import("../pages/auth/login"))
const ManageThesis = React.lazy(() => import("../../pages/admin/manageThesis"))
const ManagePeriod = React.lazy(() => import("../../pages/admin/managePeriod"))
const ManageMajor = React.lazy(() => import("../../pages/admin/manageMajor"))
const ManageRegister = React.lazy(() => import("../../pages/admin/manageRegister"))
const ManageStudent = React.lazy(() => import("../../pages/admin/manageStudent"))
const routes = [
    // other mappings ...
    { path: "/admin", element: <Navigate to="/admin/manage-user" replace={true} /> },
    { path: "/admin/manage-thesis", element: <ManageThesis /> },
    { path: "/admin/manage-term", element: <ManagePeriod /> },
    { path: "/admin/manage-major", element: <ManageMajor /> },
    { path: "/admin/manage-register", element: <ManageRegister /> },
    { path: "/admin/manage-user", element: <ManageStudent /> },
]

export default routes