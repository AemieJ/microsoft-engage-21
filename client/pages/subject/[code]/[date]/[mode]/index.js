import Head from 'next/head'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../../../../../styles/Dashboard.module.css'
import { server } from '../../../../../config/server.js'
import { useState } from 'react'
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
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleError = (err) => {
        toast.notify(err, {
            duration: 5,
            type: "error"
        })
    }

    const handleScan = (dataScan) => {
        if (dataScan) {
            setData(dataScan)
        }
    }

    const verifyAndDirect = async (e) => {
        e.preventDefault()
        if (remote !== localStorage.getItem("remote")) {
            toast.notify('Remote verification code is incorrect', {
                duration: 5,
                type: "error"
            })
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
            }
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
                mode === 'remote' ? 
                <>
                <Col sm={12} lg={true} style={{ marginTop: "3rem" }}>
                    <div style={{ fontWeight: "600" }}>Enter the remote code</div>
                    <InputGroup style={{ marginBottom: "3rem"}}>
                    <FormControl 
                    placeholder="Enter your remote code for verification"
                    value={remote}
                    style={{ color: "#1d37c2", background: "#fdfdfd"}}
                    onChange={(e) => {setCode(e.target.value) }}
                    />
                    <Button
                    style = {{ width: "30%"}}
                    onClick={verifyAndDirect}
                    >Join</Button>
                    </InputGroup>
                </Col>
                </> : <>
                <Col sm={12} lg={true} style={{ marginTop: "3rem" }}>
                    <div style={{ fontWeight: "600" }}>Scan the code on your seat</div>
                    <Button
                    style = {{ width: "30%"}}
                    >Scan</Button>
                </Col>
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