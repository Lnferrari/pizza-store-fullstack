import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalMessage = props => {
  const { id, name, price, description, onHide } = props
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          successful update
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-muted fst-italic fs-6'>
          Pizza id: { id }
        </p>
        <div>
          <h5>
            <span className='moda_title'>
              {name}
              </span>
            <span className='moda_title'>
              {price}
              </span>
          </h5>
          <p>{description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalMessage
