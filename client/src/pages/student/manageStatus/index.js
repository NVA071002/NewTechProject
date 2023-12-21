import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

function StatusTopic() {
    return (
        <div className="wrapper">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Trạng thái đề tài
            </Button>
            <Box mt={4}>
                <Button variant="contained" style={{ backgroundColor: '#1cc4a1'}}>Đề tài chờ duyệt đăng kí</Button >
                <Paper elevation={3}>
                    <Box p={4}>
                        <Typography fontWeight={"bold"}>
                            CÁC QUY ĐỊNH VỀ TRẠNG THÁI
                        </Typography>
                        <Box p={2}>
                            <Typography variant="subtitle2" fontWeight={"medium"}>
                                1. Chưa đăng ký đề tài: Tài khoản chưa đăng kí đề tài NCKH
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={"medium"} mt={2}>
                                2. Đang chờ phê duyệt: Đề tài đang được chờ phê duyệt thực hiện
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={"medium"} mt={2}>
                                3. Đã được phê duyệt thực hiện: Đề tài đã được phê duyệt tiến
                                hành ký hợp đồng với phòng KH&CN
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default StatusTopic;
