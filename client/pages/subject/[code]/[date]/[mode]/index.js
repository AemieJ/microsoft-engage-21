import Head from 'next/head'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../../../../../styles/Dashboard.module.css'
import { server } from '../../../../../config/server.js'
import { useState, useEffect } from 'react'
import { Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import login from '../../../../../public/login.svg'



export default function ModeAttend({ date, code, mode }) {
    const [remote, setCode] = useState('')
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                <Col sm={12} lg={true}>
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
                    >Join</Button>
                    </InputGroup>
                </Col>
                </> : <>
                <Col sm={12} lg={true}>
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