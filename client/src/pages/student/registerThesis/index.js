import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux'
import ConfirmDelete from "../../../components/common/ConfirmDelete";
import { getAllThesis, registerThesis } from "../store/action";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { logout } from "../../../redux/actions/auth"
import axios from "axios"
import { configHeader } from "../../../@core/plugin/configHeader";
const columns = ({ setIsConfirmOpen, setThesisId, setIsConfirmDeleteOpen }) => [
    { field: "code", headerName: "Mã đề tài", width: 150 },
    { field: "title", headerName: "Tên đề tài", width: 250 },
    { field: "description", headerName: "Mô tả", width: 400 },
    {
        field: "instructor",
        headerName: "Giáo viên hướng dẫn",
        width: 250,
        valueGetter: (params) => {
            return params.value[0].name;
        },
    },
    {
        field: "",
        headerName: "Hành động",
        width: 100,
        renderCell: (params) => {
            return (
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    {params?.row?.member.find(item => item.id === JSON.parse(localStorage.getItem("userData"))?.idUser) ? (
                        <Button
                            variant="contained bg-danger text-white"
                            size="small"
                            onClick={
                                () => {
                                    setIsConfirmDeleteOpen(true);
                                    setThesisId(params?.row?._id)
                                }
                            }
                        >
                            Hủy
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            size="small"
                            style={{ backgroundColor: '#1cc4a1'}}
                            onClick={
                                () => {
                                    setIsConfirmOpen(true);
                                    setThesisId(params?.row?._id)
                                }
                            }
                        >
                            Đăng kí
                        </Button>
                    )}
                </Box>
            );
        },
    },
];
function SubTopic() {
    // const [currentUser, setCurrentUser] = useState({});
    const store = useSelector(state => state.student.thesisList)
    // const [listTopic, setListTopic] = useState([]);
    // const [currentTopic, setCurrentTopic] = useState({});
    // const [currentPeriod, setCurrentPeriod] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [thesisId, setThesisId] = useState("")
    useEffect(() => {
        getListTopic();
    }, []);


    const handleRegisterTopic = async (id) => {
        const params = {}
        params.idThesis = id
        params.idMember = JSON.parse(localStorage.getItem("userData"))?._id
        await dispatch(registerThesis(
            params,
            () => handleLogoutUser(),
            () => { toast.success("Đăng kí thành công"); setIsConfirmOpen(false); navigate('/student/manage-thesis') }
        ))
    };

    const handleCancelTopic = async (id) => {
        axios.post("/api/cancel-register-thesis", {
            idThesis: id,
            idUser: JSON.parse(localStorage.getItem("userData"))?.idUser
        }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Đã hủy đăng ký đề tài")
            setIsConfirmDeleteOpen(false)
            getListTopic()
        }).catch((err) => {
            toast.error(err?.response?.data.message)
        })
    }
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
        params.industry = "Information Technology"
        params.status = 1
        dispatch(getAllThesis(params, () => handleLogoutUser()))
    };
    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Đăng kí đề tài
            </Button>

            {!JSON.parse(localStorage.getItem("userData"))?.major ? (
                <Box
                    mt={4}
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    justifyContent={"center"}
                    sx={{ cursor: "pointer" }}
                >
                    <Typography variant="subtitle2">
                        Bạn phải cập nhật thông tin chuyên ngành trước khi đăng kí đề tài
                    </Typography>
                    <Button style={{ backgroundColor: '#1cc4a1'}} variant="contained" size="small" href="/student/profile">
                        Cập nhật
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography variant="subtitle2" color={"error"} mt={4}>
                        *Lưu ý: Sinh viên muốn đề xuất đề tài vui lòng liên hệ với GVHD
                    </Typography>
                    <Box height={300} width={"100%"} mt={2}>
                        <DataGrid rows={store} columns={columns({ setIsConfirmOpen, setThesisId, setIsConfirmDeleteOpen })} hideFooter={true} getRowId={(row) => row._id} />
                    </Box>
                </>
            )
            }
            <ConfirmDelete
                open={isConfirmOpen}
                handleOk={() => handleRegisterTopic(thesisId)}
                title="Hộp thoại xác nhận đăng kí đề tài"
                content="Bạn có chắc chắn đăng ký đề tài này?"
                handleClose={() => setIsConfirmOpen(false)}
            />
            <ConfirmDelete
                open={isConfirmDeleteOpen}
                handleOk={() => handleCancelTopic(thesisId)}
                title="Hộp thoại xác nhận hủy đăng ký đề tài"
                content="Bạn có chắc chắn hủy đăng ký đề tài này?"
                handleClose={() => setIsConfirmDeleteOpen(false)}
            />
        </div>
    );
}

export default SubTopic;
