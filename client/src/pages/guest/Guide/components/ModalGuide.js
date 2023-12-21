import React, { useEffect, useState } from "react"
import "./styles/modal-custom-styles.scss"
import guide from "../../../../assets/guide.pdf"
// import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Document, Page, pdfjs } from "react-pdf"
import PagingControl from "./PagingControl"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const DocumentBlock = styled.div`
  position: relative;

  .react-pdf__Page__canvas {
    margin: 0 auto;
  }
  .react-pdf__Page__textContent{
    visibility: hidden;
    height: 0 !important;
    width:0 !important;
    
  }
  .react-pdf__Page__annotations{
    height: 0 !important;
    width:0 !important;
  }
`
const ModalGuide = (props) => {
  const term = guide
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(2)

  const renderTerms = () => {
    if (term) {
      return (
        <>
          <DocumentBlock style={{
            maxWidth: 802,
            width: '100%',
            margin: "20px auto",
            marginTop: 8,
            border: "1px solid #999",
            overflowX: "auto",
            overflowY: "hidden"
          }}>
            <Document
              file={term}
              onLoadSuccess={(data) => setTotalPages(data.numPages)}
            >
              <Page
                pageNumber={currentPage + 1}
                width={800}
                height={1200}
              />
            </Document>
          </DocumentBlock>
          {totalPages ? <PagingControl pageNum={currentPage} setPageNum={setCurrentPage} totalPages={totalPages} /> : ""}
        </>
      )
    } else return <div className="text-center border rounded-2 p-1">No available information</div>
  }

  return (
    <div className="desc-wrapper">
      <div className="desc">{renderTerms()}</div>
    </div>
  )
}

export default ModalGuide
