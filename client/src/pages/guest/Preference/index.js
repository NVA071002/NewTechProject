import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import ModalViewPdf from "./components/ModalViewPdf";
const columns = ({ setOpen, setThesisId }) => [
    {
        field: "id",
        headerName: "STT",
        width: 150,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
        field: "academic_year",
        headerName: "Niên khóa",
        width: 250,
    },
    {
        field: "title",
        headerName: "Tên đề tài",
        width: 250,
    },
    {
        field: "description",
        headerName: "Mô tả đề tài",
        width: 250,
    },
    {
        field: "",
        headerName: "Hành động",
        width: 300,
        renderCell: (params) => {
            return (
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Button
                        variant="contained"
                        size="small"
                        style={{ backgroundColor: '#1cc4a1'}}
                        onClick={
                            () => {
                                setOpen(true);
                                setThesisId(params?.row?._id)
                            }
                        }
                    >
                        Chi tiết
                    </Button>
                </Box>
            );
        }
    },
];


function GuestPreference() {
    const [listTopic, setListTopic] = useState([]);
    const [open, setOpen] = useState(false);
    const [thesisId, setThesisId] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        axios.post('api/get-reference').then((response) => {
            setListTopic(response.data.referenceData.data)
        })

    }, []);
    useEffect(() => {
        if (thesisId)
            readPdf()
    }, [thesisId])
    const readPdf = async () => {
        await axios.post("/api/read-pdf", { idFile: thesisId }, { responseType: 'arraybuffer' }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            setFile(url)
        })
    }
    return (
        <div className="wrapper">
            <Button style={{ backgroundColor: '#1cc4a1'}} fullWidth size="large" variant="contained" className="my-3">
                Tài liệu tham khảo
            </Button>
            <Box height={300} width={"100%"} mt={4}>
                <DataGrid rows={listTopic} columns={columns({ setOpen, setThesisId })} getRowId={(row) => row._id} />
            </Box>
            <ModalViewPdf
                open={open}
                file={file}
                thesisId={thesisId}
                handleClose={() => setOpen(false)}
            />
        </div>
    );
}

export default GuestPreference;
