import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModalGuide from "./ModalGuide"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import axios from "axios"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ModalViewPdf = (props) => {
    const downloadPdf = async () => {
        await axios.post("/api/read-pdf", { idFile: props.thesisId }, { responseType: 'arraybuffer' }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test.pdf');
            document.body.appendChild(link);
            link.click();
        })
    }
    return (
        <div id="view-hotel">
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
                fullScreen={true}
            >
                <DialogTitle color="#fff" sx={{ m: 0, p: 2 }} id="">
                    Báo cáo chi tiết
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className="btn">
                        <Button variant="outlined" color="primary" style={{ backgroundColor: '#1cc4a1'}}
                            sx={{ height: "fit-content", fontWeight: "bold" }
                            }
                            onClick={downloadPdf} >
                            <FileDownloadOutlinedIcon size={16} />
                            Download
                            {/* <Link target="_blank"></Link> */}
                        </Button>
                    </div>
                    <ModalGuide file={props.file} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose} style={{ backgroundColor: '#1cc4a1'}}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}

export default ModalViewPdf