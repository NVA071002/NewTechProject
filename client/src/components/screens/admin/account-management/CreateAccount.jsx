import { Box, Button, Grid, TextField, Select, MenuItem, FormLabel } from "@mui/material";
import React, { useState } from "react";
import SelectMajor from "../../../common/SelectMajor";
import { configHeader } from "../../../../@core/plugin/configHeader";
import axios from "axios";
import toast from "react-hot-toast";
function CreateAccount({ setList, getUserList }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [major, setMajor] = useState(null);
  const [gender, setGender] = useState("");
  const handleReset = () => {
    setName("");
    setCode("");
    setEmail("");
    setRole(0);
    setMajor(0);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await axios.post("/api/admin/add-account", {
      fullName: name,
      idUser: code,
      email: email,
      role: role,
      major: major,
      gender: gender
    }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then((res) => {
      toast.success("Thêm tài khoản thành công")
      getUserList()
      handleReset();
    }).catch((err) => {
      toast.error(err?.response?.data?.message)
    })
  };

  return (
    <Box>
      <Button style={{ backgroundColor: '#1cc4a1' }} fullWidth size="large" variant="contained">
        Quản lý tài khoản
      </Button>
      <Box mt={2} component={"form"} onSubmit={handleCreateUser}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Mã số"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              label="Giới tính"
              fullWidth
              size="small"
              value={gender}
              select
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={"Male"}>Nam</MenuItem>
              <MenuItem value={"Female"}>Nữ</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <SelectMajor value={major} setValue={setMajor} />
          </Grid>
        </Grid>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          mt={2}
        >
          <Button style={{ backgroundColor: '#1cc4a1'}} variant="contained" type="submit">
            Thêm tài khoản
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateAccount;
