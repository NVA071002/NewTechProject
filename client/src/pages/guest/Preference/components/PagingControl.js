import { BigButton } from "./BigButton"
import { primary45 } from "../../../../utility/colors"

export default function PagingControl({ totalPages, pageNum, setPageNum }) {
  const styles = {
    container: {
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 4
    },
    inlineFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    pageInfo: {
      padding: 8,
      color: primary45,
      fontSize: 14
    }
  }
  return (
    <div style={styles.container}>
      <div style={styles.inlineFlex}>
        <BigButton title="First page" onClick={() => setPageNum(0)} disabled={pageNum === 0} style={{ marginRight: "5px" }} />
        <BigButton title={"<"} onClick={() => setPageNum(pageNum - 1)} disabled={pageNum - 1 === -1} />
        <div style={styles.pageInfo}>
          Page: {pageNum + 1}/{totalPages}
        </div>
        <BigButton title={">"} onClick={() => setPageNum(pageNum + 1)} disabled={pageNum + 1 > totalPages - 1} />
        <BigButton title="Last page" onClick={() => setPageNum(totalPages - 1)} disabled={pageNum === totalPages - 1} style={{ marginLeft: "5px" }} />
      </div>
    </div>
  )
}
