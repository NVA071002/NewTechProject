import React, { useEffect, useState } from "react"
import flagIcon from "../../../../assets/icons/ic_flag.svg"
import chevronRightIcon from "../../../../assets/icons/ic-chevronRight.svg"
import axios from "axios"
import { convertDate } from "../../../../utility/ConvertDate"
const Announcement = () => {
    const [dataList, setDataList] = useState([])
    const handleFlexDirection = (index) => {
        if (index % 2 === 0) {
            return ""
        }
        else if (index % 2 !== 0) {
            return "flex-row-reverse"
        }
    }
    useEffect(() => {
        axios.post('/api/admin/get-announcement-account').then((res) => {
            setDataList(res.data.data.data)
        })
    }, [])

    return (
        <div id="Announcement">
            <div className="w-100 containerWrapper">
                <div className="container">
                    <div className="infoContainer w-100">
                        <h3>Announcement</h3>
                        <div className={`w-100 infoContainerLeft`}>
                            <div className="infoCard">
                                {dataList?.map((item, index) => {
                                    return (
                                        <div key={index} className="w-100">
                                            <div className={`infoCardItem d-flex ${handleFlexDirection(index)}`}>
                                                <div className={`infoCardItemImage`}>
                                                    <img src={`data:image/jpeg;base64,${item?.imageUrl}`} alt="notifyImg" />
                                                </div>
                                                <div className={`infoCardItemContent`}>
                                                    <div className={`w-100 infoCardItemContentHeader d-flex`}>
                                                        <div className={`infoCardItemContentHeaderHosting d-flex`}>
                                                            <img src={flagIcon} alt="icon" />
                                                            {convertDate(item?.time)}
                                                        </div>
                                                    </div>
                                                    <div className={`infoCardItemContentTitle`}>
                                                        {item?.title}
                                                    </div>
                                                    <div className={`infoCardItemContentDetail`}>
                                                        {item?.description}
                                                    </div>
                                                    <a className={`infoCardItemContentFooter mb-0`} href={`/announcement/${item._id}`}>
                                                        Read more
                                                        <img className="mx-1" src={chevronRightIcon} alt={"icon"} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                                {/* <div className={pagination}>
                                {(pagination?.total > pagination?.pageSize) && (
                                    <Pagination
                                        page={pagination?.page - 1}
                                        total={pagination?.total || 0}
                                        perPage={pagination?.pageSize}
                                        setPage={handleChangePage}
                                        isDark={isDark}
                                    />
                                )}
                            </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Announcement