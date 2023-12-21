import React, { useEffect, useState } from "react";
import { Button, Box, Typography, TextField, Grid } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux"
import { convertDateDefault } from "../../../utility/ConvertDate";
import toast from "react-hot-toast"

import axios from "axios"
import { configHeader } from "../../../@core/plugin/configHeader";
function ManageThesis() {
    const [progress, setProgress] = useState("")
    const [taskList, setTaskList] = useState({})
    const [file, setFile] = useState("")

    useEffect(() => {
        getTaskList()
    }, []);
    const getTaskList = () => {
        axios.post("/api/get-task", { idStudent: JSON.parse(localStorage.getItem("userData"))?.idUser },
            configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
                setTaskList(res.data?.thesisData?.data)
            })
    }
    const apiSubmitTask = async (id) => {
        const params = new FormData()
        params.append("progress", progress)
        params.append("submit", file)
        params.append("idTask", id)
        params.append("idUser", JSON.parse(localStorage.getItem("userData"))?._id)
        params.append = JSON.parse(localStorage.getItem("userData"))?._id
        await axios.post("/api/submit-task", params, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then(res => {
            toast.success("Nộp bài thành công")

        })
    }

    return (
        <div className="wrapper my-3">
            <Button style={{ backgroundColor: '#1cc4a1'}} fullWidth size="large" variant="contained" >
                Quản lý đề tài
            </Button>
            <Box mt={4}>
                {taskList.length !== 0 ? (
                    <>
                        <Typography variant="subtitle2">
                            Tên đề tài: {taskList[0]?.title}
                        </Typography>
                        <Typography variant="subtitle2" mt={2}>
                            Mô tả đề tài: {taskList[0]?.description}
                        </Typography>
                        {taskList.length !== 0 ? (
                            <Box mt={4}>
                                <Timeline
                                    sx={{
                                        [`& .${timelineOppositeContentClasses.root}`]: {
                                            flex: 0.2,
                                        },
                                    }}
                                >
                                    {taskList[0]?.tasks && taskList[0].tasks?.map((item, index) => (
                                        <TimelineItem>
                                            <TimelineOppositeContent color="textSecondary">
                                                {convertDateDefault(new Date(item.time))}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Accordion>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography>Giai đoạn {index + 1}: {item.task}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box mt={4}>
                                                            <Typography
                                                                variant="subtitle1"
                                                                textAlign={"center"}
                                                                fontWeight={"bold"}
                                                            >
                                                                Báo cáo tiến độ
                                                            </Typography>
                                                            <Grid container mt={4}>
                                                                <Grid item xs={3}>
                                                                    <Typography variant="subtitle2">
                                                                        Nộp báo cáo:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={8}>
                                                                    <TextField
                                                                        type="file"
                                                                        size="small"
                                                                        placeholder={item?.result}
                                                                        fullWidth
                                                                        inputProps={{ accept: "application/pdf" }}
                                                                        onChange={(e) => setFile(e.target.files[0])} />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container mt={4}>
                                                                <Grid item xs={3}>
                                                                    <Typography variant="subtitle2">
                                                                        Tiến độ:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={8}>
                                                                    <TextField
                                                                        onChange={(e) => setProgress(e.target.value)}
                                                                        size="small"
                                                                        fullWidth
                                                                        defaultValue={""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Box
                                                                display={"flex"}
                                                                justifyContent={"center"}
                                                                mt={2}
                                                            >
                                                                <Button style={{ backgroundColor: '#1cc4a1'}} variant="contained" size="small" onClick={() => apiSubmitTask(item._id)}>
                                                                    Cập nhật
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}

                                </Timeline>
                            </Box>
                        ) : (
                            <Box
                                mt={4}
                                display={"flex"}
                                alignItems={"center"}
                                gap={2}
                                justifyContent={"center"}
                                sx={{ cursor: "pointer" }}
                            >
                                <Typography variant="subtitle2">
                                    Hiện tại chưa có task nào
                                </Typography>
                            </Box>
                        )}
                    </>
                ) : (
                    <Box
                        mt={4}
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        justifyContent={"center"}
                        sx={{ cursor: "pointer" }}
                    >
                        <Typography variant="subtitle2">
                            Hiện tại bạn chưa đăng kí đề tài nào
                        </Typography>
                        <Button variant="contained" size="small" href="/student/register-thesis" style={{ backgroundColor: '#1cc4a1'}}>
                            Đăng kí
                        </Button>
                    </Box>
                )}
            </Box>
        </div>
    );
}

export default ManageThesis;
