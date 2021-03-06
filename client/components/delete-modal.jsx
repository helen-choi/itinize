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
    correctTag = <i className="fas fa-trash-alt icon" onClick={handleShow}></i>;
    // correctTag = <img onClick={() => props.handleClickDelete(destination.destinationId)} className="icon" src="./images/trash.png" alt="" />;
  }

  return (
    <>
      {correctTag}
      {/* this.handleClickDelete(destinationInfo.destinationId) */}
      <Modal className='modal' centered show={show} onHide={handleClose}>
        <Modal.Body className="text-center">Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-top-0">
          <Button className="btn-modal-close" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-modal-delete" variant="danger" onClick={() => {
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
