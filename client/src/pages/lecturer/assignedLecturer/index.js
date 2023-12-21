import { Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const listTopic = [
    {
        id: 1,
        title: "Đè tài 1",
        description: "Mô tả 1",
        teacher: {
            name: "Nguyễn Thanh Thuy",
        },
        student: {
            name: "Nguyễn Thanh Thuy",
        },
        dayReivew: "10/10/2022",
    }
]

function AssignedReview() {
    //   const [currentUser, setCurrentUser] = useState({});
    //   const [listTopic, setListTopic] = useState([]);

    const columns = [
        {
            field: "id",
            headerName: "Mã đề tài",
            width: 150,
            valueGetter: (params) => {
                return params.value;
            },
        },
        { field: "title", headerName: "Tiêu đề", width: 150 },
        { field: "description", headerName: "Mô tả", width: 250 },
        {
            field: "student",
            headerName: "Sinh viên thực hiện",
            width: 250,
            valueGetter: (params) => {
                return params.value?.name;
            },
        },
        {
            field: "teacher",
            headerName: "Giảng viên hướng dẫn",
            width: 250,
            valueGetter: (params) => {
                return params.value?.name;
            },
        },
        { field: "dayReivew", headerName: "Ngày phản biện", width: 150 },
    ];
    return (
        <div className="wrapper my-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Đề tài được phân công phản biện
            </Button>
            <Box height={300} width={"100%"} mt={4}>
                <DataGrid rows={listTopic} columns={columns} />
            </Box>
        </div>
    );
}

export default AssignedReview;
