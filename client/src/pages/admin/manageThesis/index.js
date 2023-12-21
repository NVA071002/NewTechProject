import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDelete from "../../../components/common/ConfirmDelete";
import ModalUpdate from "../../../components/common/ModalUpdate";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../../../redux/actions/auth"
import { useNavigate } from 'react-router-dom'
import { getAllThesis } from "../../student/store/action";
import { useSelector, useDispatch } from "react-redux";
import { configHeader } from "../../../@core/plugin/configHeader";
const renderStatus = (status) => {
    switch (status) {
        case 0:
            return "Hoàn thành";
        case 1:
            return "Đã duyệt";
        case 2:
            return "Chờ duyệt"
    }
}
function ManageThesis() {
    const [listTopic, setListTopic] = useState([]);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [idUpdate, setIdUpdate] = useState("");
    const [thesisDetail, setThesisDetail] = useState({});
    const [title, setTitle] = useState("");
    const [titleAdd, setTitleAdd] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionAdd, setDescriptionAdd] = useState("");
    const [code, setCode] = useState("");
    const [infoTopicUpdate, setInfoTopicUpdate] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const store = useSelector(state => state.student?.thesisList)
    const [loading, setLoading] = useState(false)
    const columns = [
        {
            field: "code",
            headerName: "Mã đề tài",
            width: 150,
        },
        { field: "title", headerName: "Tên đề tài", width: 250 },
        { field: "description", headerName: "Mô tả", width: 250 },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 200,
            renderCell: (params) => {
                const label = renderStatus(params.row.status)
                const color = params.row.status === 2 ? "warning" : "success";
                return <Chip label={label} color={color} />;
            },
        },
        {
            field: "",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Button
                            variant="contained"
                            size="small"
                            style={{ backgroundColor: '#1cc4a1'}}
                            onClick={() => {
                                setIsOpenModalUpdate(true);
                                setIdUpdate(params.row._id);
                                geThesisDetail(params.row._id)
                            }}
                        >
                            Sửa
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => {
                                setIsOpenConfirmDelete(true);
                                setIdDelete(params.row._id);
                            }}
                        >
                            Hủy
                        </Button>
                    </Box>
                );
            },
        },
    ];
    const geThesisDetail = (id) => {
        setThesisDetail(store.find((e) => e._id === id))
    }
    const handleCreateTopic = async () => {
        const params = {}
        params.title = titleAdd
        params.description = descriptionAdd
        params.code = code
        params.industry = JSON.parse(localStorage.getItem("userData")).facility
        params.instructor = JSON.stringify([{
            id: JSON.parse(localStorage.getItem("userData")).idUser,
            name: JSON.parse(localStorage.getItem("userData")).name,
            faculty: JSON.parse(localStorage.getItem("userData")).facility,
        }])
        params.academic_year = "2017-2021"
        params.time_start = "03/02/2021"
        params.time_end = "07/20/2021"
        params.type = "Capstone project"
        params.status = 2
        await axios.post("/api/upload-thesis",
            params,
            configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
            .then((res) => {
                toast.success("Tạo đề tài thành công")
                setIsOpenModalAdd(false);
            }).catch((err) => {
                toast.error(err?.response?.data?.thesisData?.errMessage)
            })

    };

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
    useEffect(() => {
        const getInfoUpdate = () => {
            setTitle(thesisDetail?.title);
            setDescription(thesisDetail?.description);
        };
        idUpdate && getInfoUpdate();
    }, [idUpdate]);

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
        dispatch(getAllThesis(params, () => handleLogoutUser()))
    };

    const handleUpdate = async () => {
        const params = {}
        params.id = idUpdate
        params.title = title
        params.description = description
        await axios.post("/api/admin/update-thesis-by-id",
            params,
            configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
            .then((res) => {
                toast.success("Chỉnh sửa đề tài thành công")
                getListTopic()
                setIsOpenModalUpdate(false);
            }).catch((err) => {
                toast.error(err?.response?.data?.thesisData?.errMessage)
            })
    };


    return (
        <div className="wrapper my-3">
            <Button  style={{ backgroundColor: '#1cc4a1'}} fullWidth size="large" variant="contained">
                Quản lý đề tài
            </Button>
            <Box height={"70vh"} width={"100%"} mt={4}>
                <div className="d-flex justify-content-end">
                    <Button size="large"  style={{ backgroundColor: '#1cc4a1'}} variant="contained" onClick={() => setIsOpenModalAdd(true)}>
                        Thêm đề tài
                    </Button>
                </div>
                <DataGrid rows={store} columns={columns} hideFooter={true} getRowId={(row) => row._id} />
            </Box>
            <ConfirmDelete
                title={"Hủy đề tài"}
                content={"Bạn có chắc chắn muốn hủy đề tài này không ?"}
                open={isOpenConfirmDelete}
                handleOk={handleDelete}
                handleClose={() => setIsOpenConfirmDelete(false)}
            />
            <ModalUpdate
                open={isOpenModalUpdate}
                handleClose={() => setIsOpenModalUpdate(false)}
                handleOk={handleUpdate}
                title={"Hộp thoại chỉnh sửa đề tài"}
                titleOk={"Chỉnh sửa"}
            >
                <Grid container spacing={2} py={2}>
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
                </Grid>
            </ModalUpdate>
            <ModalUpdate
                open={isOpenModalAdd}
                handleClose={() => setIsOpenModalAdd(false)}
                handleOk={handleCreateTopic}
                title={"Thêm đề tài"}
                titleOk={"Thêm"}
            >
                <Grid container spacing={2} py={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Typography variant="subtitle2">Mã đề tài:</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                size="small"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} mt={1}>
                        <Grid item xs={2}>
                            <Typography variant="subtitle2">Tên đề tài:</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                size="small"
                                value={titleAdd}
                                onChange={(e) => setTitleAdd(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} mt={1}>
                        <Grid item xs={2}>
                            <Typography variant="subtitle2">Mô tả đề tài:</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                value={descriptionAdd}
                                onChange={(e) => setDescriptionAdd(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </ModalUpdate>
        </div>
    );
}

export default ManageThesis;
