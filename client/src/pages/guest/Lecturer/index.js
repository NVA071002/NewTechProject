import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 50,
    valueGetter: (params) => {
      return params.value;
    },
  },
  { field: "name", headerName: "Họ tên", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Số điện thoại", width: 250 },
  {
    field: "major",
    headerName: "Chuyên ngành",
    width: 250,
    valueGetter: (params) => {
      return params.value?.name;
    },
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 250,
    valueGetter: (params) => {
      const value = params?.value == 1 ? "Giảng viên" : "Trưởng bộ môn";
      return value;
    },
  },
];
const listTeacher = [
  {
    id: 1,
    name: "Nguyễn Thế Huy",
    email: "huynguyen@123",
    phone: "0123456789",
    major: {
      id: 1,
      name: "Công nghệ thông tin",
    }
  }
]
function GuestContact() {

  return (
    <div className="wrapper my-3">
      <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
        Thông tin liên hệ
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={listTeacher} columns={columns} />
      </Box>
    </div>
  );
}

export default GuestContact;
