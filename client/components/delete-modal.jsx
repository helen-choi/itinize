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
      <div onClick={handleShow} className="cursor-pointer circle red m-auto d-flex justify-content-center align-items-center text-light">
        <i handler="delete" className="fas fa-trash-alt fa-lg"></i>
      </div>
    );
  }
  if (props.destinationItem) {
    correctTag = <img onClick={handleShow} className="icon" src="./images/trash.png" alt="" />;
    // correctTag = <img onClick={() => props.handleClickDelete(destination.destinationId)} className="icon" src="./images/trash.png" alt="" />;
  }

  return (
    <>
      {correctTag}
      {/* this.handleClickDelete(destinationInfo.destinationId) */}
      <Modal className='modal' centered show={show} onHide={handleClose}>
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
