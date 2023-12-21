import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import contract from "../../../assets/text.pdf"
import { Link } from "react-router-dom"
import ModalUpdate from "../../../components/common/ModalUpdate";
import axios from "axios"
import toast from "react-hot-toast";
import { configHeader } from "../../../@core/plugin/configHeader";
const listTopic = [
    {
        _id: 1,
        mssv: "Đè tài 1",
        description: "Mô tả 1",
        status: 0,
        name: "Nguyễn Thanh Thuy",
        date: "10/10/2022",
    }
]

function ManageStudentSubmit() {
    //   const [currentUser, setCurrentUser] = useState({});
    //   const [listTopic, setListTopic] = useState([]);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [assess, setAssess] = useState(null)
    const [idTask, setIdTask] = useState(null)
    const columns = [
        { field: "mssv", headerName: "MSSV", width: 150 },
        { field: "name", headerName: "Tên sinh viên", width: 250 },
        { field: "file", headerName: "Bài nộp", width: 250 },
        { field: "status", headerName: "Trạng thái đánh giá", width: 250 },
        { field: "date", headerName: "Ngày nộp", width: 250 },
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
                            onClick={
                                () => {
                                    setIsOpenModalUpdate(true);
                                    setIdTask(params.row._id);
                                }
                            }
                        >
                            Đánh giá
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const handleOk = () => {
        axios.post("/api/evaluate-task", {
            idTask: idTask,
            evaluate: assess,
        }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Đánh giá thành công")
            setIsOpenModalUpdate(false)
        }).catch((err) => {
            toast.error(err?.response?.data.message)
        })
    }
    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Danh sách sinh viên nộp tiến độ
            </Button>
            <Box height={300} width={"100%"} mt={4}>
                <DataGrid rows={listTopic} columns={columns} getRowId={(row) => row._id} />
            </Box>
            <ModalUpdate
                open={isOpenModalUpdate}
                handleOk={handleOk}
                titleOk={"Đánh giá"}
                handleClose={() => setIsOpenModalUpdate(false)}
                title={"Hộp thoại đánh giá"}>
                <>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">
                            Báo cáo tiến độ: Đã hoàn thành bước đầu tiên, đang hoàn thành bước thứ 2
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">
                            Bài nộp: <Link to={contract} target="_blank" download>ádsad.pdf</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className="my-3">
                        <TextField
                            fullWidth
                            label="Nhập đánh giá"
                            size="small"
                            value={assess}
                            onChange={(e) => setAssess(e.target.value)}
                            rows={4}
                            multiline
                        />
                    </Grid>
                </>
            </ModalUpdate>
        </div>
    );
}

export default ManageStudentSubmit;
