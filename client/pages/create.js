import Head from 'next/head'
import { server } from "../config/server";
import { toast, ToastContainer } from 'react-nextjs-toast'
import register from '../public/register.svg'
import Image from 'next/image'
import { Col, Row, Form, Button, Dropdown } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import { useState } from 'react'
import Link from 'next/link'

// TODO: add meeting link attribute
export default function Create() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

    const setAllNull = () => {
        setName('')
        setCode('')
        setDescription('')
        setLink('')
    }

    const insertData = async (e) => {
        e.preventDefault()
        if (name.length === 0 || code.length === 0 || link.length === 0) {
            toast.notify('Form is incomplete', {
                duration: 5,
                type: "error"
            })
        } else {
            let obj = { name, code, description, link }
            let body = {
                accessToken: localStorage.getItem("accessToken"),
                body: obj
            }

            const res = await fetch(`${server}/api/createClass`, {
                method: "post",
                body: JSON.stringify(body),
            });

            const { data, err } = await res.json()
            if (err) {
                toast.notify(err, {
                    duration: 5,
                    type: "error"
                })
            } else {
                toast.notify('Class has been created successfully. Next setup the timetable', {
                    duration: 5,
                    type: "success"
                })
            }
        }

        setTimeout(setAllNull(), 8000)
    }

    return (
        <>
            <Head>
                <title>Scheduler - Create Class</title>
                <meta name="description" content="An application for the students and faculty both like" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row className={styles.main}>
                <Col sm={12} lg={true}>
                    <div>
                        <div className={styles.title}>Create a new class!</div>
                        <div className={styles.description}>As a faculty, you can create a new subject class and
                        <b>share the code with your students to join this class.</b></div>
                    </div>
                    <Form autoComplete="new-password" className={styles.form}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label><b>{"Subject Name"}</b></Form.Label>
                            <Form.Control type="text"
                                required
                                placeholder="eg. CNS"
                                className={styles.form_control}
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCode">
                            <Form.Label><b>Subject Code</b></Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="eg. CO305"
                                className={styles.form_control}
                                value={code}
                                onChange={(e) => { setCode(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLink">
                            <Form.Label><b>Meeting Link</b></Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter meeting link"
                                className={styles.form_control}
                                value={link}
                                onChange={(e) => { setLink(e.target.value) }} />
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="formBasicDescrp">
                            <Form.Label><b>Subject Description</b></Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter subject description (optional)"
                                className={styles.form_control}
                                value={description}
                                onChange={(e) => { setDescription(e.target.value)}}
                                />
                        </Form.Group>

                        <div className={styles.btn_grp}>
                            <Button variant="primary" type="submit"
                                className={styles.submit}
                                onClick={insertData}
                            >
                                Create
                        </Button>
                        </div>

                    </Form>
                </Col>
            </Row>

            <ToastContainer />
        </>
    )
}