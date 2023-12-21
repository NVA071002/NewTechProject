import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskTable from "../manageTask/TaskTable";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/auth"
import { useNavigate } from 'react-router-dom'
import { getAllThesis } from "../../student/store/action";
function ManageTask() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [id, setId] = useState(searchParams.get("id"))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const store = useSelector(state => state.student?.thesisList)
    const [loading, setLoading] = useState(false)
    const taskList = store?.find(item => item?._id === id)?.tasks
    const thesis = store?.find(item => item?._id === id)
    useEffect(() => {
        getListTopic();
    }, []);
    const handleLogoutUser = () => {
        dispatch(logout(
            JSON.parse(localStorage.getItem("userData"))?._id,
            setLoading,
            () => navigate("/login")
        ))
        localStorage.removeItem("userData")
        localStorage.removeItem("token")
    }
    const getListTopic = async () => {
        const params = {}
        params.industry = JSON.parse(localStorage.getItem("userData")).major
        params.status = 1
        dispatch(getAllThesis(params, () => handleLogoutUser()))
    };
    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Chi tiết đề tài
            </Button>
            <Typography variant="subtitle2">
                Tên đề tài: {thesis?.title}
            </Typography>
            <Typography variant="subtitle2" mt={2}>
                Mô tả đề tài: {thesis?.description}
            </Typography>
            <Typography variant="subtitle2" mt={2}>
                Sinh viên thực hiện: {thesis?.member?.map((item, index) => <span key={index}>{item?.name} </span>)}
            </Typography>
            <TaskTable idThesis={id} taskList={taskList} getListTopic={getListTopic} />
        </div>
    );
}

export default ManageTask;
