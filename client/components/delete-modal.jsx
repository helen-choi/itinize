import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="circle red m-auto d-flex justify-content-center align-items-center">
        <i onClick={handleShow} handler="delete" className="fas fa-trash-alt fa-lg"></i>
      </div>
      {/* this.handleClickDelete(destinationInfo.destinationId) */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            handleClose();
            props.handleDelete(props.destinationId);
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
