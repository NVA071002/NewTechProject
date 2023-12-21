import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDelete from "../../../common/ConfirmDelete";
import ModalUpdate from "../../../common/ModalUpdate";
import axios from "axios"
import toast from "react-hot-toast";
import { configHeader } from "../../../../@core/plugin/configHeader";
function InfoAccount({ data, setList, getUserList }) {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [accountDetail, setAccountDetail] = useState({});
  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState(null);

  const columns = [
    {
      field: "idUser",
      headerName: "Mã người dùng",
      width: 150,
    },
    { field: "name", headerName: "Họ tên", width: 250 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "major",
      headerName: "Ngành",
      width: 250,
    },
    {
      field: "role",
      headerName: "Quyền",
      width: 150,
    },
    {
      field: "",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                setIsOpenConfirmDelete(true);
                setIdDelete(params.row._id);
              }}
            >
              Xóa
            </Button>
            <Button
              style={{ backgroundColor: '#1cc4a1'}}
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenModalUpdate(true);
                setIdUpdate(params.row._id);
                getAccountDetail(params.row._id)
              }}
            >
              Cập nhật
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleDelete = async () => {
    try {
      await axios.post("/api/admin/delete-account", { idAccount: idDelete }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
        .then((res) => {
          toast.success("Xóa thành công")
          setIsOpenConfirmDelete(false);
          setList(data?.filter((e) => e._id !== idDelete));
        })

    } catch (error) {
      throw error;
    }
  };
  const getAccountDetail = (id) => {
    setAccountDetail(data.find((e) => e._id === id))
  }
  const handleUpdate = async () => {
    await axios.post("/api/admin/update-by-id", {
      id: idUpdate,
      fullName: name,
      phone: phone,
      major: major,
      facility: "Information Technology",
      major: major,
      gender: sex,
      role: role,
      stClass: "18290301"
    }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then((res) => {
      toast.success("Cập nhật thành công")
      setIsOpenModalUpdate(false);
      getUserList()
    }).catch((err) => {
      toast.error(err?.response?.data?.errMessage)
    })
  };

  useEffect(() => {
    const getInfoUpdate = () => {
      setName(accountDetail?.name);
      setPhone(accountDetail?.phone);
      setMajor(accountDetail?.major);
      setEmail(accountDetail?.email);
      setSex(accountDetail?.gender);
      setRole(accountDetail?.role);
    };
    idUpdate && getInfoUpdate();
  }, [idUpdate]);

  return (
    <Box mt={8}>
      <Typography textAlign={"center"} variant="h6" fontWeight={"bold"}>
        DANH SÁCH TÀI KHOẢN
      </Typography>
      <Box height={"70vh"} width={"100%"} mt={4}>
        <DataGrid rows={data} columns={columns} hideFooter={true} getRowId={(row) => row._id} />
      </Box>
      <ConfirmDelete
        open={isOpenConfirmDelete}
        handleOk={handleDelete}
        handleClose={() => setIsOpenConfirmDelete(false)}
      />
      <ModalUpdate
        open={isOpenModalUpdate}
        handleClose={() => setIsOpenModalUpdate(false)}
        handleOk={handleUpdate}
      >
        <Grid container spacing={2} py={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Họ và tên"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Chuyên ngành"
              size="small"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              value={email}
              defaultValue={accountDetail?.email || ""}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vai trò"
              fullWidth
              size="small"
              value={role}
              select
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"Student"}>Sinh Viên</MenuItem>
              <MenuItem value={"Lecturer"}>Giảng Viên</MenuItem>
              <MenuItem value={"Management"}>Trường bộ môn</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Số điện thoại"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              row
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <FormControlLabel
                value={"Male"}
                control={<Radio size="small" />}
                label="Nam"
              />
              <FormControlLabel
                value={"Female"}
                control={<Radio size="small" />}
                label="Nữ"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </ModalUpdate>
    </Box>
  );
}

export default InfoAccount;
