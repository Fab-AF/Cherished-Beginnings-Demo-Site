import React from "react";
import { Modal } from "react-bootstrap";
const CommonModal = ({ open, onClose, children }) => {
  return (
    <Modal
      className="custommodalwidth findcaremodals customwidth800px"
      centered
      show={open}
      onHide={onClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="">{children}</Modal.Body>
    </Modal>
  );
};

export default CommonModal;
