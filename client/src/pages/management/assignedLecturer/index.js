import {
    Button,
    Box,
    Grid,
    Typography,
    TextField,
    Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdate from "../../../components/common/ModalUpdate";
import { notify } from "../../../utility/helpers/notify";
const listTopic = [{
    id: 1,
    student: {
        name: "Nguyễn Thanh Huy",
    },
    teacher: {
        name: "Nguyễn Thanh Huy",
    },
    title: "Tài liệu tham khảo",
    description: "sdads"
}]

const listTeacherReview = [{

}]
function AssignTeacherReview() {
    const [isOpenModal, setIsOpenMdal] = useState(false);
    // const [listTopic, setListTopic] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [listTeacherReview, setListTeacherReview] = useState([]);
    const [teacherReview, setTeacherReview] = useState(null);
    const [currentteacher, setCurrentTeacher] = useState(null);
    const [currentTopic, setCurrentTopic] = useState(null);

    const [dayReivew, setDayReview] = useState(null);

    const columns = [
        { field: "title", headerName: "Tiêu đề", width: 250 },
        {
            field: "description",
            headerName: "Mô tả",
            width: 250,
        },
        {
            field: "teacher",
            headerName: "Giáo viên HD",
            width: 250,
            valueGetter: (params) => {
                return params.value?.name;
            },
        },
        {
            field: "student",
            headerName: "Sinh viên thực hiện",
            width: 250,
            valueGetter: (params) => {
                return params.value?.name;
            },
        },
        {
            field: "",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                return (
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Button
                            variant="contained"
                            size="small"
                            style={{ backgroundColor: '#1cc4a1'}}
                            onClick={() => {
                                setIsOpenMdal(true);
                                setCurrentTeacher(params?.row?.teacher?._id);
                                setCurrentTopic(params?.row?._id);
                            }}
                        >
                            Phân công
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const handleAssginReivew = async () => {
        try {
            if (!dayReivew) {
                notify("warn", "Bạn chưa nhập ngày phản biện");
            } else if (!teacherReview) {
                notify("warn", "Bạn chưa chọn giáo viên phản biện");
            } else if (teacherReview == currentteacher) {
                notify(
                    "warn",
                    "Vui lòng chọn giáo viên phản biện khác giáo viên hướng dẫn"
                );
            } else {
                // await update(currentTopic, { teacherReview, dayReivew });
                notify("success", "Phân công giáo viên phản biện thành công");
                // await getListTopic();
                setIsOpenMdal(false);
            }
        } catch (error) { }
    };

    // const getListTopic = async () => {
    //     try {
    //         const res = await list({
    //             approveByManagement: 1,
    //             teacherReview: "null",
    //             major: currentUser?.major?._id,
    //             teacher: "notNull",
    //             student: "notNull",
    //         });
    //         setListTopic(res?.data?.map((e) => ({ id: e._id, ...e })));
    //     } catch (error) { }
    // };



    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Phân công GV phản biện
            </Button>
            <Box height={300} width={"100%"} mt={4}>
                <DataGrid rows={listTopic} columns={columns} />
            </Box>
            <ModalUpdate
                open={isOpenModal}
                handleClose={() => setIsOpenMdal(false)}
                title={"Phân công hội đồng phản biện"}
                handleOk={handleAssginReivew}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2">Giáo viên phản biện:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        {listTeacherReview && (
                            <Autocomplete
                                options={listTeacherReview}
                                renderInput={(params) => (
                                    <TextField {...params} size="small" fullWidth />
                                )}
                                onChange={(e, value) => setTeacherReview(value.value)}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                    <Grid item xs={4}>
                        <Typography variant="subtitle2">Ngày phản biện:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            value={dayReivew}
                            onChange={(e) => setDayReview(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </ModalUpdate>
        </div>
    );
}

export default AssignTeacherReview;
