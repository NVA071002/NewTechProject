import { Button, Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDelete from "../../../components/common/ConfirmDelete";
import axios from "axios"
import { configHeader } from "../../../@core/plugin/configHeader";
import { getAllThesis } from "../../student/store/action";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/auth"
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

const ConfirmApprove = styled(ConfirmDelete)({});

function ApproveSubTopic() {
    const [isOpenModal, setIsOpenMdal] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const store = useSelector(state => state.student?.thesisList)
    const [loading, setLoading] = useState(false)
    const [idDelete, setIdDelete] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [thesisId, setThesisId] = useState("")
    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 150,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
        },
        { field: "title", headerName: "Tiêu đề", width: 250 },
        {
            field: "instructor", headerName: "Giáo viên HD", width: 250,
            valueGetter: (params) => {
                return params.value[0].name;
            }
        },
        { field: "description", headerName: "Mô tả", width: 250 },
        {
            field: "",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            style={{ backgroundColor: '#1cc4a1'}}
                            onClick={() => {
                                setIsOpenMdal(true)
                                setThesisId(params?.row?._id)
                            }}
                        >
                            Duyệt
                        </Button>
                        <Button
                            variant="contained text-white bg-danger"
                            size="small"
                            onClick={() => {
                                setIsOpenConfirmDelete(true)
                                setIdDelete(params?.row?._id)
                            }
                            }>
                            Xóa
                        </Button>
                    </Box>
                );
            },
        },
    ];
    useEffect(() => {
        getListTopic();
    }, []);
    const handleDelete = async () => {
        await axios.post("/api/admin/remove-thesis-by-id", { id: idDelete }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
            .then(res => {
                toast.success("Đã hủy đề tài")
                setIsOpenConfirmDelete(false)
                getListTopic()
            }).catch(err => {
                toast.error(err?.response?.data?.message)
            })

    };
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
        params.status = 2
        dispatch(getAllThesis(params, () => handleLogoutUser()))
    };
    const approveThesis = (idThesis) => {
        axios.post("/api/browse-thesis", {
            browse: "accept",
            idRequest: idThesis
        }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Duyệt đề tài thành công")
            setIsOpenMdal(false)
            getListTopic()
        })
    }
    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Duyệt đăng kí đề tài
            </Button>
            <Box height={300} width={"100%"} mt={4}>
                <DataGrid rows={store} columns={columns} getRowId={(row) => row._id} />
            </Box>
            <ConfirmApprove
                open={isOpenModal}
                title={"Hộp thoại xác nhận"}
                handleOk={() => approveThesis(thesisId)}
                content={"Bạn có chắc chắn muốn duyệt đề tài này không?"}
                handleClose={() => setIsOpenMdal(false)}
            />
            <ConfirmDelete
                open={isOpenConfirmDelete}
                handleOk={handleDelete}
                handleClose={() => setIsOpenConfirmDelete(false)}
            />
        </div>
    );
}

export default ApproveSubTopic;
