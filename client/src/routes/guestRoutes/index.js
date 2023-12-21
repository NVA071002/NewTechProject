import React from "react"
import { Navigate } from "react-router-dom"
// other page components...
const Login = React.lazy(() => import("../../pages/guest/Login"))
const Announcement = React.lazy(() => import("../../pages/guest/Announcement/list"))
const Guide = React.lazy(() => import("../../pages/guest/Guide"))
const AnnouncementDetail = React.lazy(() => import("../../pages/guest/Announcement/detail"))
const Preference = React.lazy(() => import("../../pages/guest/Preference"))
const LecturerList = React.lazy(() => import("../../pages/guest/Lecturer"))

const routes = [
    // other mappings ...    
    { path: "login", element: <Login /> },
    { path: "annoucement", element: <Announcement /> },
    { path: "/", element: <Navigate to="/annoucement" replace={true} /> },
    { path: "announcement/:id", element: <AnnouncementDetail /> },
    { path: "guide", element: <Guide /> },
    { path: "lecturer-list", element: <LecturerList /> },
    { path: "preference", element: <Preference /> },
]

export default routes