import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { logout } from "../../../redux/actions/auth"
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from "@mui/x-data-grid";
import { getAllThesis } from "../../student/store/action";
import ConfirmDelete from "../../../components/common/ConfirmDelete";
import ModalUpdate from "../../../components/common/ModalUpdate";


const listTopic = [{
    id: "1",
    title: "Tiêu đề 1",
    description: "Tiêu đề 1",
}]
function ManageThesis() {
    // const [listTopic, setListTopic] = useState([]);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const store = useSelector(state => state.student.thesisList)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [idDelete, setIdDelete] = useState("");
    const [idUpdate, setIdUpdate] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [infoTopicUpdate, setInfoTopicUpdate] = useState({});

    useEffect(() => {
        getListTopic();
    }, []);

    const columns = [
        {
            field: "code",
            headerName: "Mã đề tài",
            width: 150,
        },
        { field: "title", headerName: "Tên đề tài", width: 250 },
        { field: "description", headerName: "Mô tả", width: 250 },
        {
            field: "",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        {
                            params.row.status === 2 ?
                                <div>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ backgroundColor: '#1cc4a1'}}
                                        onClick={() => {
                                            setIsOpenModalUpdate(true);
                                            setIdUpdate(params.row._id);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        style={{ backgroundColor: '#1cc4a1'}}
                                        color="error"
                                        onClick={() => {
                                            setIsOpenConfirmDelete(true);
                                            setIdDelete(params.row._id);
                                        }}
                                    >
                                        Hủy đề tài
                                    </Button>
                                </div>
                                : <>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ backgroundColor: '#1cc4a1'}}
                                        href={`/${JSON.parse(localStorage.getItem("userData")).role}/manage-task?id=${params.row._id}`}
                                    >
                                        Chi tiết
                                    </Button>
                                </>

                        }

                    </Box>
                );
            },
        },
    ];

    const getListTopic = async () => {
        const params = {}
        params.industry = JSON.parse(localStorage.getItem("userData")).major
        params.status = 1
        dispatch(getAllThesis(params, () => handleLogoutUser()))
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
    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Quản lý đề tài
            </Button>
            <Box height={"70vh"} width={"100%"} mt={4}>
                <DataGrid rows={store} columns={columns} hideFooter={true} getRowId={(row) => row._id} />
            </Box>
            <ConfirmDelete
                title={"Hủy đề tài"}
                content={"Bạn có chắc chắn muốn hủy đề tài này không ?"}
                open={isOpenConfirmDelete}
                // handleOk={handleDelete}
                handleClose={() => setIsOpenConfirmDelete(false)}
            />
            <ModalUpdate
                open={isOpenModalUpdate}
                handleClose={() => setIsOpenModalUpdate(false)}
                // handleOk={handleUpdate}
                title={"Hộp thoại chi tiết"}
            >
                <Grid container spacing={2} py={2}>
                    {infoTopicUpdate?.owner === currentUser?._id ? (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tên đề tài"
                                    size="small"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mô tả đề tài"
                                    size="small"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">
                                    Tên đề tài: {infoTopicUpdate?.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">
                                    Sinh viên thực hiện: {infoTopicUpdate?.description}
                                </Typography>
                            </Grid>
                        </>
                    )}

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">
                            Chuyên ngành: {infoTopicUpdate?.major?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">
                            Sinh viên thực hiện:{" "}
                            {infoTopicUpdate?.student
                                ? infoTopicUpdate?.student?.name
                                : "Không có"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">
                            Trạng thái:{" "}
                            {infoTopicUpdate?.approveByManagement === 1
                                ? "Đã được phê duyệt"
                                : "Chưa được phê duyệt"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color={"error"}>
                            *Lưu ý: chỉ cập nhật được đề tài do mình tạo
                        </Typography>
                    </Grid>
                </Grid>
            </ModalUpdate>

        </div>
    );
}

export default ManageThesis;
