import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { convertDate } from "../../../../utility/ConvertDate"
const Detail = () => {
    const [detail, setDetail] = useState({})
    const { id } = useParams()
    useEffect(() => {
        getDataById()

    }, [])
    const getDataById = () => {
        axios.post('/api/admin/get-announcement-by-id', { id: id }).then((res) => {
            setDetail(res.data.data.data)
        })
    }
    return (
        <>
            <div id="announcement-detail" className="detail">
                <div className="blog-container">
                    <div className="blog-item">
                        <h3>{detail?.title}</h3>
                        <img src={`data:image/jpeg;base64,${detail?.imageUrl}`} />
                        <p>{detail?.description}</p>
                        <h4 style={{ textAlign: "right" }}>Author: {detail?.author} ({convertDate(detail?.time)})</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
