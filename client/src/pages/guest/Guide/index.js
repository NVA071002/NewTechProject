import ModalGuide from "./components/ModalGuide"
import guide from "../../../assets/guide.pdf"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const Guide = () => {
    return (
        <div id="Guide">
            <h3>Instruction to use website</h3>
            <div className="btn">
                <Button variant="outlined" color="primary"
                    sx={{ height: "fit-content", fontWeight: "bold" }} style={{ backgroundColor: '#1cc4a1'}}>
                    <FileDownloadOutlinedIcon size={16} />
                    <Link to={guide} target="_blank" download>Download</Link>
                </Button>
            </div>
            <ModalGuide />
        </div>
    )
}
export default Guide