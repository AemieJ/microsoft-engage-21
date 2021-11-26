import Head from 'next/head'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../../../../../styles/Dashboard.module.css'
import { server } from '../../../../../config/server.js'
import { useState, useEffect } from 'react'
import { Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import login from '../../../../../public/login.svg'
import dynamic from 'next/dynamic'

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

export default function ModeAttend({ date, code, mode }) {
    const [remote, setCode] = useState('')
    const [data, setData] = useState('No scanned data')
    const [facingMode, setMode] = useState('user')
    const [scan, setScan] = useState(false)
    const [verifiedScan, setVerified] = useState(false)
    const [click, setClick] = useState(false)
    const [code1, setOTPCode] = useState('')
    const [otp, setOTP] = useState('')
    const [attendance, setAttendance] = useState(false)

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        if (localStorage.getItem(`attendance-${code}`) === "true") {
            setAttendance(true)
        }
    }, [])
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleError = (err) => {
        toast.notify(err, {
            duration: 5,
            type: "error"
        })
        setScan(false)
    }

    const handleScan = (dataScan) => {
        if (dataScan) {
            setData(dataScan)
            if (dataScan === localStorage.getItem("in_person")) {
                setVerified(true)
            } else {
                toast.notify('Seat code scanned doesn\'t match your code', {
                    duration: 5,
                    type: "error"
                })
                setVerified(false)
            }
        }
    }

    const verifyAndDirect = async (e) => {
        e.preventDefault()
        if (remote !== localStorage.getItem("remote")) {
            toast.notify('Remote verification code is incorrect', {
                duration: 5,
                type: "error"
            })
            localStorage.setItem(`attendance-${code}`, false)
        } else {
            let body = {
                accessToken: localStorage.getItem("accessToken"),
                code
            }

            const res = await fetch(`${server}/api/fetchMeetingCode`, {
                method: "POST",
                body: JSON.stringify(body)
            })

            const { data, err } = await res.json()
            if (err) {
                toast.notify(err, {
                    duration: 5,
                    type: "error"
                })
                localStorage.setItem(`attendance-${code}`, false)
            } else {
                let parsed = JSON.parse(data)
                toast.notify('Attendance will be taken manually for the time being', {
                    duration: 5,
                    type: "success"
                })
                setTimeout(() => {
                    window.open(parsed.link, '_blank')
                    window.location.reload()
                }, 8000)
                localStorage.setItem(`attendance-${code}`, true)
            }
        }
    }

    const sendOtp = async (e) => {
        e.preventDefault()
        let length = 6
        let codeTemp = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);

        const res = await fetch(`${server}/api/sendMail`, {
            method: "POST",
            body: JSON.stringify({
                receiver: localStorage.getItem("email"),
                code: codeTemp
            })
        })

        const { data, err } = await res.json()
        if (err) {
            toast.notify(err, {
                duration: 5,
                type: "error"
            })
            setClick(false)
        } else {
            toast.notify(data, {
                duration: 5,
                type: "success"
            })
            setOTPCode(codeTemp)
            setClick(true)
        }
    }


    return (
        <>
            <Row className={styles.main}>
                <Col className={styles.image}><Image src={login} className={styles.login_image} /></Col>
                <Col>
                    <div className={styles.title_sec}>
                        <p className={styles.title}>{code}</p>
                    </div>
                    <Row className={styles.mode_sec_page}>
                        <Col>
                            <Row className={styles.mode_sec_title}>Date for Class</Row>
                            <Row>{date}</Row>
                        </Col>
                        <Col>
                            <Row className={styles.mode_sec_title}>Mode of Attending</Row>
                            <Row>{capitalizeFirstLetter(mode)}</Row>
                        </Col>
                    </Row>
                    <p className={styles.description}>For the <b>purpose of attendance</b>, you need to either
            enter the code or scan the  qr code on your seat to grab an attendance.</p>
                    {
                        attendance ? <p className={styles.description}>
                            <b style={{ color: "#1d37c2" }}>Your attendance has already been taken! </b></p>
                            : <></>
                    }
                    {
                        mode === 'remote' ?
                            <>
                                <Col sm={12} lg={true} style={{ marginTop: "3rem" }}>
                                    <div style={{ fontWeight: "600" }}>Enter the remote code</div>
                                    <InputGroup style={{ marginBottom: "3rem" }}>
                                        <FormControl
                                            placeholder="Enter your remote code for verification"
                                            value={remote}
                                            disabled={attendance}
                                            style={{ color: "#1d37c2", background: "#fdfdfd" }}
                                            onChange={(e) => { setCode(e.target.value) }}
                                        />
                                        <Button
                                            style={{ width: "30%" }}
                                            disabled={attendance}
                                            onClick={verifyAndDirect}
                                        >Join</Button>
                                    </InputGroup>
                                </Col>
                            </> : <>
                                {
                                    !scan ? <>
                                        <Col sm={12} lg={true} style={{ marginTop: "3rem" }}>
                                            <div style={{ fontWeight: "600" }}>Scan the code on your seat</div>
                                            <Button
                                                onClick={() => setScan(true)}
                                                style={{ width: "30%" }}
                                                disabled={attendance}
                                            >Scan</Button>
                                        </Col>
                                    </> : <>
                                            {
                                                !verifiedScan ? <QrReader
                                                    delay={300}
                                                    onError={handleError}
                                                    onScan={handleScan}
                                                    style={{ width: '40%' }}
                                                    facingMode={mode}
                                                /> : <>
                                                        <Col sm={12} lg={true} style={{ marginTop: "3rem" }}>
                                                            <div>The seat code scanned is - <b>{data}</b></div>
                                                        </Col>
                                                        <Col sm={12} lg={true} style={{ marginTop: "3rem" }}>
                                                            <div style={{ fontWeight: "600" }}>Click on send OTP for double-verification</div>
                                                            {
                                                                !click ?
                                                                    <Button
                                                                        style={{ width: "30%" }}
                                                                        onClick={sendOtp}
                                                                    >Send OTP</Button> :
                                                                    <>
                                                                        <InputGroup style={{ marginBottom: "3rem" }}>
                                                                            <FormControl
                                                                                placeholder="Enter the OTP send on your email"
                                                                                value={otp}
                                                                                style={{ color: "#1d37c2", background: "#fdfdfd" }}
                                                                                onChange={(e) => setOTP(e.target.value)}
                                                                            />
                                                                            <Button
                                                                                style={{ width: "30%" }}
                                                                                onClick={() => {
                                                                                    if (otp === code1) {
                                                                                        toast.notify('Attendance will be taken manually for the time being', {
                                                                                            duration: 5,
                                                                                            type: "success"
                                                                                        })
                                                                                        localStorage.setItem(`attendance-${code}`, true)
                                                                                        setTimeout(() => {
                                                                                            window.location.reload()
                                                                                        }, 8000)
                                                                                    } else {
                                                                                        toast.notify('Incorrect otp', {
                                                                                            duration: 5,
                                                                                            type: "error"
                                                                                        })
                                                                                        localStorage.setItem(`attendance-${code}`, false)
                                                                                        setVerified(false)
                                                                                    }
                                                                                }}
                                                                            >Verify</Button>
                                                                        </InputGroup>
                                                                    </>
                                                            }

                                                        </Col>
                                                    </>
                                            }

                                        </>
                                }
                            </>
                    }
                </Col>
            </Row>

            <ToastContainer />
        </>
    )
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            date: context.query.date,
            code: context.query.code,
            mode: context.query.mode
        }
    }
}