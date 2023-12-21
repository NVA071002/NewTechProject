import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import SelectMajor from "../../../components/common/SelectMajor";
import { DataGrid } from "@mui/x-data-grid";
import { notify } from "../../../utility/helpers/notify";
import ConfirmDelete from "../../../components/common/ConfirmDelete";
const data = [{
    id: 1,
    name: "Chuyên ngành 1",
    timeOpen: "09:00",
    timeClose: "12:00",
}]
function ManagePeriod() {
    const [timeOpen, setTimeOpen] = useState("");
    const [timeClose, setTimeClose] = useState("");
    const [major, setMajor] = useState("");
    const [listPeriod, setListPeriod] = useState([]);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    const columns = [
        {
            field: "major",
            headerName: "Tên chuyên ngành",
            width: 200,
            valueGetter: (params) => {
                return params.value?.name;
            },
        },
        { field: "timeOpen", headerName: "Thời gian mở", width: 200 },
        { field: "timeClose", headerName: "Thời gian đóng", width: 200 },
        {
            field: "",
            headerName: "Hành động",
            width: 200,
            renderCell: (params) => {
                return (
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={() => {
                                setIsOpenConfirmDelete(true);
                                setIdDelete(params.row._id);
                            }}
                        >
                            Xóa
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const getListPeriod = async () => {
        try {
            // const res = await list();
            // setListPeriod(res.data?.map((e) => ({ id: e._id, ...e })));
        } catch (error) {
            throw error;
        }
    };

    const handleDelete = async () => {
        try {
            // await deletePeriod(idDelete);
            notify("success", "Xóa thành công");
            setIsOpenConfirmDelete(false);
            getListPeriod();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreatePeriod = async (e) => {
        e.preventDefault();
        try {
            // await create({ timeClose, timeOpen, major });
            getListPeriod();
            notify("success", "Tạo thành công");
        } catch (error) {
            notify("error", error?.response?.data?.message);
        }
        handleClear();
    };

    const handleClear = () => {
        setTimeOpen("");
        setTimeClose("");
        setMajor("");
    };

    useEffect(() => {
        getListPeriod();
    }, []);

    return (
        <div className="wrapper py-3">
            <Button fullWidth size="large" variant="contained" style={{ backgroundColor: '#1cc4a1'}}>
                Quản lý thời gian đăng kí đề tài
            </Button>
            <Box mt={4} component={"form"} onSubmit={handleCreatePeriod}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Thời gian mở"
                            placeholder="DD/MM/YYY"
                            required
                            value={timeOpen}
                            onChange={(e) => setTimeOpen(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Thời gian đóng"
                            placeholder="DD/MM/YYY"
                            required
                            value={timeClose}
                            onChange={(e) => setTimeClose(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectMajor value={major} setValue={setMajor} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" type="submit" style={{ backgroundColor: '#1cc4a1'}}>
                            Tạo
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box height={"70vh"} width={"100%"} mt={4}>
                <DataGrid rows={data} columns={columns} hideFooter={true} />
            </Box>
            <ConfirmDelete
                open={isOpenConfirmDelete}
                handleOk={handleDelete}
                handleClose={() => setIsOpenConfirmDelete(false)}
            />
        </div>
    );
}

export default ManagePeriod;
