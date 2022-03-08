import React from "react";
import Modal from 'react-bootstrap/Modal';

export default function ModalWindow({smShow, modalOff, value, title}) {
  return (
    <>
      <Modal
        size="sm"
        show={smShow}
        onHide={modalOff}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{value}</Modal.Body>
      </Modal>
    </>
  );
}
