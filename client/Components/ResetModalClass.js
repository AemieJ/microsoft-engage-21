import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useState } from 'react'
import styles from '../styles/Modal.module.css'
import { server } from '../config/server.js'
import { toast, ToastContainer } from 'react-nextjs-toast'

const ResetModalClass = () => {
    const [showModal, setShowModal] = useState(true)

    const resetCode = async (e) => {
        e.preventDefault()

        const res = await fetch(`${server}/api/reset`, {
            method: "POST",
            body: localStorage.getItem("accessToken")
        })

        const { data, err } = await res.json()
        if (err) {
            toast.notify(err, {
                duration: 5,
                type: "error"
            })
        } else {
            toast.notify('Codes and preferences have been successfully reset', {
                duration: 5,
                type: "success"
            })

            let today = Math.round(new Date().getTime() / 1000)
            localStorage.setItem("lastWeek", today)
        }

        setTimeout(window.location.reload(), 8000)
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
                    Reset the codes!
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    As {"it's"} Saturday again, it is time to clear your code and reset your preferences
                    for the next week.
        </p>
        <Button
                        style={{ width: "30%" }}
                        onClick={resetCode}
                        >Reset Code</Button>
            </Modal.Body>
            
        </Modal>
        <ToastContainer />
        </>
    )
}

export default ResetModalClass;