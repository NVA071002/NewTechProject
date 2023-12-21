import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

function TableUserInfomation({ user, handleUpdate }) {
  return (
    <Paper elevation={2}>
      <Box p={4}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Họ và tên:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.name}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Username:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.username}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Email:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.email}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Ngành:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.major?.name}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Ngày sinh:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.birth}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Mã số:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?._id}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Số điện thoại:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.phone}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Giới tính:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {user?.sex > 0 ? "Nam" : "Nữ"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Địa chỉ:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{user?.address}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4} textAlign={"center"}>
          <Button variant="contained" onClick={handleUpdate} style={{ backgroundColor: '#1cc4a1'}}>
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default TableUserInfomation;
