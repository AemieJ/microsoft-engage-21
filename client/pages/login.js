import Head from 'next/head'
import { toast, ToastContainer } from 'react-nextjs-toast'
import { server } from "../config/server";
import login from '../public/login.svg'
import Image from 'next/image'
import { Col, Row, Form, Button, Modal, ModalBody } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const setAllNull = () => {
        setEmail('')
        setPassword('')
    }

    const matchEmail = () => {
        let regex1 = /^[a-zA-Z0-9+_.-]{8}@[a-zA-Z0-9.-]+.svnit.ac.in$/gm
        let regex2 = /^[a-zA-Z0-9+_.-]{3}@[a-zA-Z0-9.-]+.svnit.ac.in$/gm

        if (email.match(regex1) || email.match(regex2)) return true
        return false
    }

    const verifyData = () => {
        if (password.length >= 6 && password.length <= 256) {
            let matchMail = matchEmail()
            return matchMail
        } else {
            return false
        }
    }

    const loginUser = async (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0) {
            toast.notify('Form is incomplete', {
                duration: 5,
                type: "error"
            })
        } else {
            let valid = verifyData()
            if (valid) {
                let body = {
                    email, password
                }

                const res = await fetch(`${server}/api/login`, {
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
                    let parsed = JSON.parse(data)
                    let accessToken = parsed.token
                    let role = parsed.roles[0].toLowerCase()
                    localStorage.setItem("accessToken", accessToken)
                    localStorage.setItem("email", email)
                    localStorage.setItem("isLogged", 1)
                    localStorage.setItem("role", role)
                    toast.notify('Successful Login', {
                        duration: 5,
                        type: "success"
                    })
                    setTimeout(window.location.href = `/dashboard/${parsed.role}`, 8000)
                }
            } else {
                toast.notify('Data filled is invalid', {
                    duration: 5,
                    type: "error"
                })
            }
        }

    }

    return (
        <>
            <Head>
                <title>Scheduler - Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row className={styles.main}>
                <Col className={styles.image}><Image src={login} className={styles.login_image} /></Col>
                <Col sm={12} lg={true}>
                    <div>
                        <div className={styles.title}>Welcome Back 👋🏼</div>
                        <div className={styles.description}>{"Let's get"} you started with
                                easy scheduling and maintaining your studying preferences</div>
                    </div>
                    <Form auto="new-password" className={styles.form}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label><b>Email address</b></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your college email id"
                                className={styles.form_control}
                                value={email}
                                onChange={e => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className={`mb-3`} controlId="formBasicPassword">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control type="password" placeholder="*********"
                                className={styles.form_control}
                                value={password}
                                onChange={e => { setPassword(e.target.value) }} />
                        </Form.Group>
                        <div className={styles.btn_grp}>
                            <Button variant="primary" type="submit"
                                className={styles.submit}
                                onClick={loginUser}>
                                Login
                        </Button>
                        </div>


                    </Form>
                </Col>
            </Row>

            <ToastContainer />

        </>
    )
}