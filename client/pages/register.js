import Head from 'next/head'
import { server } from "../config/server";
import { toast, ToastContainer } from 'react-nextjs-toast'
import register from '../public/register.svg'
import Image from 'next/image'
import { Col, Row, Form, Button } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [role, setRole] = useState('student')
    const [password, setPassword] = useState('')
    const [rePass, setRePassword] = useState('')

    const setAllNull = () => {
        setName('')
        setEmail('')
        setGender('male')
        setPassword('')
        setRePassword('')
    }

    const matchEmail = () => {
        let regex1 = /^[a-zA-Z0-9+_.-]{8}@[a-zA-Z0-9.-]+.svnit.ac.in$/gm
        let regex2 = /^[a-zA-Z0-9+_.-]{3}@[a-zA-Z0-9.-]+.svnit.ac.in$/gm

        if (email.match(regex1) || email.match(regex2)) return true
        return false
    }

    const verifyData = () => {
        if (name.length >= 6 && name.length <= 100) {
            if (password.length >= 6 && password.length <= 256) {
                let matchMail = matchEmail()
                return matchMail
            } else {
                return false
            }
        } else {
            return true
        }
    }

    const insertData = async (e) => {
        e.preventDefault()
        if (name.length === 0 || email.length === 0 || password.length === 0 || rePass.length === 0) {
            toast.notify('Form is incomplete', {
                duration: 5,
                type: "error"
            })
        } else {
            let valid = verifyData()
            if (valid && password === rePass) {
                let body = {
                    name, email, gender, role, password
                }

                const res = await fetch(`${server}/api/register`, {
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
                    toast.notify('Registration Successful. Please login with the credentials', {
                        duration: 5,
                        type: "success"
                    })
                }
            } else if (valid && password !== rePass) {
                toast.notify('Password and Re-pass don\'t match', {
                    duration: 5,
                    type: "error"
                })
            } else if (!valid) {
                toast.notify('Data filled is invalid', {
                    duration: 5,
                    type: "error"
                })
            }
        }


        setTimeout(setAllNull(), 8000)
    }

    return (
        <>
            <Head>
                <title>Scheduler - Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row className={styles.main}>
                <Col sm={12} lg={true}>
                    <div>
                        <div className={styles.title}>Join us & easily schedule!</div>
                        <div className={styles.description}>Just easily fill up the form in a few seconds,
                    and you will be able to you manage your preferences and attendences.</div>
                    </div>
                    <Form autoComplete="new-password" className={styles.form}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label><b>{"Name"}</b></Form.Label>
                            <Form.Control type="text"
                                required
                                placeholder="eg. Aemie Jariwala"
                                className={styles.form_control}
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label><b>Email address</b></Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Enter college id"
                                className={styles.form_control}
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>

                        <div className={styles.radio_sec}>
                            <div>
                                <Form.Label><b>Gender</b></Form.Label>
                                <div key={`inline-radio`} className={`mb-3 ${styles.form_control}`}>
                                    <Form.Check
                                        inline
                                        required
                                        label="male"
                                        name="group1"
                                        type="radio"
                                        id="male"
                                        checked={gender === 'male'}
                                        onChange={() => { setGender("male") }}
                                    />
                                    <Form.Check
                                        inline
                                        required
                                        label="female"
                                        name="group1"
                                        type="radio"
                                        id="female"
                                        checked={gender === 'female'}
                                        onChange={() => { setGender("female") }}
                                    />
                                </div>
                            </div>
                            <div className={styles.role}>
                                <Form.Label><b>User Role</b></Form.Label>
                                <div key={`inline-radio-1`} className={`mb-3 ${styles.form_control}`}>
                                    <Form.Check
                                        inline
                                        required
                                        label="student"
                                        name="group2"
                                        type="radio"
                                        id="student"
                                        checked={role === 'student'}
                                        onChange={() => { setRole('student') }}
                                    />
                                    <Form.Check
                                        inline
                                        required
                                        label="faculty"
                                        name="group2"
                                        type="radio"
                                        id="faculty"
                                        checked={role === 'faculty'}
                                        onChange={() => { setRole('faculty') }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.password_sec}>
                            <Form.Group className={`mb-3`} controlId="formBasicPassword">
                                <Form.Label><b>Password</b></Form.Label>
                                <Form.Control type="password" placeholder="*********"
                                    required
                                    className={styles.form_control}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.password}`} controlId="formBasicRePassword">
                                <Form.Label><b>Re-enter Password</b></Form.Label>
                                <Form.Control type="password" placeholder="*********"
                                    required
                                    className={styles.form_control}
                                    value={rePass}
                                    onChange={(e) => { setRePassword(e.target.value) }}
                                />
                            </Form.Group>
                        </div>

                        <div className={styles.btn_grp}>
                            <Button variant="primary" type="submit"
                                className={styles.submit}
                                onClick={insertData}
                            >
                                Register
                        </Button>
                            <div className={styles.btn_description}>Have an account? <br /> <b><Link href="/login">Login In</Link></b></div>
                        </div>

                    </Form>
                </Col>
                <Col className={styles.image}><Image src={register} /></Col>
            </Row>

            <ToastContainer />
        </>
    )
}