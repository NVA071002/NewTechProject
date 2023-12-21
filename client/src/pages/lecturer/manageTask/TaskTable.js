import { Button, Box, Typography, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { logout } from "../../../redux/actions/auth"
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast"
import axios from "axios"
import contract from "../../../assets/text.pdf"
import { Link } from "react-router-dom"
import { convertDateDefault } from "../../../utility/ConvertDate";
import { configHeader } from "../../../@core/plugin/configHeader";
import ConfirmDelete from "../../../components/common/ConfirmDelete";
import ModalUpdate from "../../../components/common/ModalUpdate";
const columns = ({ setIsOpenConfirmDelete, setTaskId, setIsOpenModalDetail }) => [
    {
        field: "time",
        headerName: "Thời gian",
        width: 150,
        renderCell: (params) => {
            return convertDateDefault(params?.value);
        }
    },
    { field: "task", headerName: "Task", width: 250 },
    { field: "description", headerName: "Mô tả", width: 250 },
    { field: "evaluate", headerName: "Đánh giá", width: 250 },
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
                            setIsOpenModalDetail(true)
                            setTaskId(params?.row?._id)
                        }}
                    >
                        Đánh giá
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        style={{ backgroundColor: '#1cc4a1'}}
                        className="bg-danger text-white"
                        onClick={() => {
                            setIsOpenConfirmDelete(true)
                            setTaskId(params?.row?._id)
                        }}
                    >
                        Xoá task
                    </Button>
                </Box>
            );
        },
    },
];

function TaskTable({ taskList, idThesis, getListTopic }) {
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = React.useState("");
    const [taskId, setTaskId] = useState("")
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)
    const [assess, setAssess] = useState("")

    const handleDelete = () => {
        axios.post("/api/remove-task", {
            taskId: taskId,
            idThesis: idThesis
        }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Xóa thành công")
            getListTopic()
            setIsOpenConfirmDelete(false)
        }).catch((err) => {
            toast.error(err?.response?.data.message)
        })
    }
    const handleOk = () => {
        axios.post("/api/create-task", {
            task: title,
            description: description,
            time: convertDateDefault(new Date(value)),
            idThesis: idThesis
        }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Thêm task thành công")
            getListTopic()
            setIsOpenModalUpdate(false)
        }).catch((err) => {
            toast.error(err?.response?.data.message)
        })
    }
    const handleEvaluate = () => {
        axios.post("/api/evaluate-task", {
            idTask: taskId,
            evaluate: assess,
        }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Đánh giá thành công")
            getListTopic()
            setIsOpenModalDetail(false)
        }).catch((err) => {
            toast.error(err?.response?.data.message)
        })
    }

    const downloadPdf = async () => {
        await axios.post("/api/read-task", { idFile: taskId }, { responseType: 'arraybuffer' }).then((res) => {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test.pdf');
            document.body.appendChild(link);
            link.click();
        })
    }
    return (
        <div className="wrapper my-3">
            <Box height={300} width={"100%"} mt={4}>
                <div className="d-flex justify-content-end my-2" >
                    <Button variant="contained" onClick={() => setIsOpenModalUpdate(true)} style={{ backgroundColor: '#1cc4a1'}}>
                        Thêm task
                    </Button>
                </div>
                {taskList && <DataGrid rows={taskList} columns={columns({ setIsOpenConfirmDelete, setTaskId, setIsOpenModalDetail })} getRowId={(row) => row._id} />}

            </Box>
            <ModalUpdate
                open={isOpenModalUpdate}
                handleOk={handleOk}
                titleOk={"Thêm"}
                handleClose={() => setIsOpenModalUpdate(false)}
                title={"Thêm task"}>
                <>
                    <Grid item xs={12} className="my-3">
                        <TextField
                            fullWidth
                            label="Tên task"
                            size="small"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mô tả"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={5}
                        />
                    </Grid>
                    <Typography variant="subtitle2" mt={2}>
                        Thời gian:
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        type="date"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </>

            </ModalUpdate>
            <ModalUpdate
                open={isOpenModalDetail}
                titleOk={"Xác nhận"}
                title={"Hộp thoại đánh giá"}
                handleClose={() => setIsOpenModalDetail(false)}
                handleOk={handleEvaluate}
            >
                <Grid item xs={6}>
                    <Typography variant="subtitle2">
                        Báo cáo tiến độ: {taskList ? taskList[0]?.progress : "Chưa cập nhật"}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle2">
                        Bài nộp: {taskList ? <Link onClick={downloadPdf} target="_blank" download>{taskList[0]?.result}</Link> : "Chưa có bài nộp"}
                    </Typography>
                </Grid>
                <Grid item xs={12} className="my-3">
                    <TextField
                        fullWidth
                        label="Nhập đánh giá"
                        size="small"
                        defaultValue={assess}
                        value={assess}
                        onChange={(e) => setAssess(e.target.value)}
                        rows={4}
                        multiline
                    />
                </Grid>
            </ModalUpdate>
            <ConfirmDelete
                open={isOpenConfirmDelete}
                handleOk={handleDelete}
                handleClose={() => setIsOpenConfirmDelete(false)}
            />
        </div>
    );
}

export default TaskTable;
