import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios"
import toast from "react-hot-toast"
import { configHeader } from '../../../@core/plugin/configHeader'
function ManagementSubTopic() {
    // const [currentUser, setCurrentUser] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const handleClear = () => {
        setCode("")
        setTitle("");
        setDescription("");
    };

    const handleCreateTopic = async () => {
        const params = {}
        params.title = title
        params.description = description
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
                handleClear();
            }).catch((err) => {
                toast.error(err?.response?.data?.thesisData?.errMessage)
            })

    };


    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Đăng kí đề tài
            </Button>
            <Box p={4} component={"form"}>
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
                    <Button variant="outlined" color="error" onClick={handleClear} style={{ backgroundColor: '#1cc4a1'}}>
                        Clear
                    </Button>
                    <Button variant="contained" onClick={handleCreateTopic} style={{ backgroundColor: '#1cc4a1'}}>
                        Đăng kí
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default ManagementSubTopic;
