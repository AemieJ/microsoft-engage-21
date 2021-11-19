import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useState } from 'react'
import styles from '../styles/Modal.module.css'

const ModalClass = () => {
    const [showModal, setShowModal] = useState(true)
    const [code, setCode] = useState('')

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={showModal}
            onHide={() => {
                setShowModal(false)
                window.location.reload()
            }}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Join the new class 🚀
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    To join a new class, you will need to enter the specific code to join the particular class.
          If {"you're"} unable to join, contact your respective faculty.
        </p>
                <Form auto="new-password">
                    <Form.Label><b>Class Code</b></Form.Label>
                    <InputGroup className={styles.code_inp}>
                        <FormControl aria-label="Class code"
                            style={{ color: "#1d37c2", background: "#fdfdfd" }}
                            placeholder="Enter code & join your class" 
                            value={code}
                            onChange={(e) => {setCode(e.target.value)}}/>
                        <Button
                        style={{ width: "30%" }}
                        onClick={(e) => {
                            e.preventDefault()
                            // TODO: add class implementation
                            // 1. check whether class exists 
                            // 2. if exists, update user class list subjects to include the new one
                        }}
                        >Join</Button>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    setShowModal(false)
                    window.location.reload()
                }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalClass;