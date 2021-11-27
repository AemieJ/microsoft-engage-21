import Head from 'next/head'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../../../../styles/Dashboard.module.css'
import { server } from '../../../../config/server.js'
import { useState, useEffect } from 'react'
import { Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'



export default function Prefs({ date, code }) {
    const [remoteCount, setRCount] = useState(0)
    const [offlineCount, setOCount] = useState(0)
    const [remoteUsers, setRemote] = useState([])
    const [offlineUsers, setOffline] = useState([])
    const [isRemote, setIsRemote] = useState(true)
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    useEffect(() => {
        let from = localStorage.getItem("from")
        let to = localStorage.getItem("to")
        // this change is being made to adjust with the vercel utc timing
        let temp = date.split('-')
        let temp2 = temp[0]
        temp[0] = temp[1], temp[1] = temp2
        let date1 = temp.join("/")
        let newDateFrom = `${date1} ${from} UTC`
        let newDateTo = `${date1} ${to} UTC`
        let fromEpoch = new Date(newDateFrom).getTime()
        let toEpoch = new Date(newDateTo).getTime()

        const fetchRemotePreference = async () => {
            let obj = {
                subjectCode: code,
                from: fromEpoch.toString(),
                to: toEpoch.toString()
            }
            let body = {
                accessToken: localStorage.getItem("accessToken"),
                body: obj
            }

            const res = await fetch(`${server}/api/fetchRemotePrefs`, {
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
                setRCount(parsed.count)
                setRemote(parsed.users)
            }
        }

        const fetchOfflinePrefs = async () => {
            let obj = {
                subjectCode: code,
                from: fromEpoch.toString(),
                to: toEpoch.toString()
            }
            let body = {
                accessToken: localStorage.getItem("accessToken"),
                body: obj
            }
            
            const res = await fetch(`${server}/api/fetchOfflinePrefs`, {
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
                setOCount(parsed.count)
                setOffline(parsed.users)
            }
        }

        fetchRemotePreference()
        fetchOfflinePrefs()
    }, [])

    return (
        <>
        <Head>
        <title>Scheduler - Preferences</title>
        <meta name="description" content="An application for the students and faculty both like" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <div className={styles.title_sec}>
                <p className={styles.title}>{code} - Preferences</p>
                <InputGroup style={{ width: "auto" }}>
                    <InputGroup.Text className={styles.badge_name}>Total Count</InputGroup.Text>
                    <InputGroup.Text className={styles.badge_val}>{offlineCount + remoteCount}</InputGroup.Text>
                </InputGroup>
            </div>
            <p className={styles.description}>This page includes the list of <b>preferences of the particular
            subject on {date}</b> of the students.
            </p>
            <Row className={styles.preferences_sec}>
                <Col>
                    <Row className={styles.pref_title}>Subject Code</Row>
                    <Row>{code}</Row>
                </Col>
                <Col>
                    <Row className={styles.pref_title}>Class Date</Row>
                    <Row>{date}</Row>
                </Col>
                <Col>
                    <Row className={styles.pref_title}>Remote Users</Row>
                    <Row>{remoteCount} { remoteCount !== 1 ? "users" : "user"}</Row>
                </Col>
                <Col>
                    <Row className={styles.pref_title}>Offline Users</Row>
                    <Row>{offlineCount} { offlineCount !== 1 ? "users" : "user"}</Row>
                </Col>
            </Row>

            <div className={styles.prefs_toggle_sec}>
                <Button className={styles.prefs_btn_toggle}
                active={isRemote}
                onClick={() => setIsRemote(true)}
                >Remote</Button>
                <Button className={`${styles.prefs_btn_toggle} ${styles.prefs_btn_toggle_second}`}
                active={!isRemote}
                onClick={() => setIsRemote(false)}
                >
                    In-person</Button>
            </div>

            <div className={styles.box}>
                {
                    isRemote ? <>
                    {
                        remoteUsers.map((user, idx) => {
                            return (
                            <div className={styles.user_pref}
                            key={user.email}>{idx + 1}. {user.name} - {user.email}</div>
                            )
                        })
                    }
                    </> : <>
                    {
                        offlineUsers.map((user, idx) => {
                            return (
                            <div className={styles.user_pref}
                            key={user.email}>{idx + 1}. {user.name} - {user.email}</div>
                            )
                        })
                    }
                    </>
                }
            </div>
           
            <ToastContainer />
        </>
    )
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            date: context.query.date,
            code: context.query.code
        }
    }
}