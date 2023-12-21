import React from "react"
import { Card, Modal, Spinner } from "reactstrap"

export const LoadingBackground = () => {

  return (
    <Modal isOpen={true} centered toggle={() => { }} className={"modal-xs modal-loader"}>
      <Card className={"mb-0 p-2 text-center"}>
        <div className={"d-flex justify-content-center"}>
          <Spinner type="border" color="primary" />
        </div>
        <p className={"mt-2 mb-0"}>Please wait...</p>
      </Card>
    </Modal>
  )
}
