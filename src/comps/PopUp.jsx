import React from 'react'
import { Button, Card, Container, Modal, ProgressBar, Stack, Form } from 'react-bootstrap';

const ErrorPopUpComponent = ({show, handleClose, title, message}) => {
  return (
    <Modal show={show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>{message}</Form.Label>
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' type='button' onClick={handleClose}>Okay</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

export default ErrorPopUpComponent
