import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useState } from 'react'
import styles from '../styles/Modal.module.css'
import { server } from '../config/server.js'
import { toast, ToastContainer } from 'react-nextjs-toast'

const ModalClass = () => {
    const [showModal, setShowModal] = useState(true)
    const [code, setCode] = useState('')

    const joinClass = async (e) => {
        e.preventDefault()
        const res = await fetch(`${server}/api/joinClass`, {
            method: "POST",
            body: JSON.stringify({
                code,
                accessToken: localStorage.getItem("accessToken")
            })
        })

        const { data, err } = await res.json()
        if (err) {
            toast.notify(err, {
                duration: 5,
                type: "error"
            })
        } else {
            toast.notify('Successfully joined the class', {
                duration: 5,
                type: "success"
            })
        }
        window.location.reload()
    }

    return (
        <>
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
                        onClick={joinClass}
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
        <ToastContainer />
        </>
    )
}

export default ModalClass;