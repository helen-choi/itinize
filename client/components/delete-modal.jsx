import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let correctTag;
  if (props.destinationInfo) {
    correctTag = (
      <div className="circle red m-auto d-flex justify-content-center align-items-center text-light">
        <i onClick={handleShow} handler="delete" className="fas fa-trash-alt fa-lg"></i>
      </div>
    );
  }
  if (props.lodgingItem) {
    correctTag = <i className="fas fa-times" onClick={handleShow}></i>;
  }

  return (
    <>
      {correctTag}
      {/* this.handleClickDelete(destinationInfo.destinationId) */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            handleClose();
            props.deleteHandle(props.id);
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
