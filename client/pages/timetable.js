import Head from 'next/head'
import { server } from "../config/server";
import { toast, ToastContainer } from 'react-nextjs-toast'
import register from '../public/register.svg'
import Image from 'next/image'
import { Col, Row, Form, Button, Dropdown, InputGroup } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import { useState } from 'react'
import Link from 'next/link'

export default function TimeTable() {
    const [code, setCode] = useState('') // check whether code is under this faculty
    const [day, setDay] = useState('Monday')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [check, setChecked] = useState(false)
    const [fromArr, setFromArr] = useState([])
    const [toArr, setToArr] = useState([])

    const setAllNull = () => {
        setCode('')
        setDay('Monday')
        setFrom('')
        setTo('')
        setChecked(false)
        setFromArr([])
        setToArr([])
    }

    const months = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const createDateArray = () => {
        let given = months.indexOf(day)
        var d = new Date(),
            year = d.getYear(),
            days = []

        d.setDate(d.getDate() + 1)
        while (d.getDay() !== given) {
            d.setDate(d.getDate() + 1);
        }

        while (d.getYear() === year) {
            var pushDate = new Date(d.getTime());
            days.push(pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear());
            d.setDate(d.getDate() + 7);
        }

        days.forEach((day) => {
            fromArr.push(day + ' ' + from)
        })

        days.forEach((day) => {
            toArr.push(day + ' ' + to)
        })

        setFromArr(fromArr)
        setToArr(toArr)
    }

    const insertData = async (e) => {
        e.preventDefault()
        if (code.length === 0 || day.length === 0 || to.length === 0) {
            toast.notify('Form is incomplete', {
                duration: 5,
                type: "error"
            })
        } else {
            let res = await fetch(`${server}/api/checkCode`, {
                method: "post",
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    accessToken: localStorage.getItem("accessToken"),
                    code
                })
            })

            let { data, err } = await res.json()
            if (err) {
                toast.notify(err, {
                    duration: 5,
                    type: "error"
                })
            } else {
                if (!data) { 
                    toast.notify('Class code isn\'t created under your name', {
                        duration: 5,
                        type: "error"
                    })
                } else {
                    createDateArray()
                    let body = {
                        email: localStorage.getItem("email"),
                        accessToken: localStorage.getItem("accessToken"),
                        code,
                        day,
                        to: toArr,
                        from: fromArr
                    }

                    res = await fetch(`${server}/api/updateTimeTable`, {
                        method: "post", 
                        body: JSON.stringify(body)
                    })

                    let data2 = await res.json()
                    if (data2.err) {
                        toast.notify(data2.err, {
                            duration: 5,
                            type: "error"
                        })
                    } else {
                        toast.notify(data2.data, {
                            duration: 5,
                            type: "success"
                        })
                    }
                }
            }
        }

        setTimeout(setAllNull(), 8000)
    }

    const timeToMins = (time) => {
        var b = time.split(':');
        return b[0]*60 + +b[1];
    }
    
    const timeFromMins = (mins) => {
        const z = (n) => {return (n<10? '0':'') + n;}
        var h = (mins/60 |0) % 24;
        var m = mins % 60;
        return z(h) + ':' + z(m);
    }
      
    const addTimes = (t0, t1) => {
        return timeFromMins(timeToMins(t0) + timeToMins(t1));
    }

    return (
        <>
            <Head>
                <title>Scheduler - Create TimeTable</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Row className={styles.main}>
                <Col sm={12} lg={true}>
                    <div>
                        <div className={styles.title}>{"Let's"} get started with the timetable 🚀</div>
                        <div className={styles.description}>Here, you will mention the day and date of the
                        classes you have created to be <b>included in the timetable for students.</b></div>
                    </div>
                    <Form autoComplete="new-password" className={styles.form}>

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

                        <div className={styles.time_sec}>
                        <Form.Group className={styles.time_sec_item}>
                        <Form.Label><b>Scheduling Day</b></Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {day}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                onClick={() => {setDay('Monday')}}>Monday</Dropdown.Item>
                                <Dropdown.Item
                                onClick={() => {setDay('Tuesday')}}>Tuesday</Dropdown.Item>
                                <Dropdown.Item
                                onClick={() => {setDay('Wednesday')}}>Wednesday</Dropdown.Item>
                                <Dropdown.Item
                                onClick={() => {setDay('Thursday')}}>Thursday</Dropdown.Item>
                                <Dropdown.Item
                                onClick={() => {setDay('Friday')}}>Friday</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Form.Group>

                        <Form.Group className={styles.time_sec_item}>
                        <Form.Label><b>Scheduling Time (From)</b></Form.Label>
                        <Form.Control
                                type="time"
                                required
                                className={`${styles.form_control}`}
                                value={from}
                                onChange={(e) => { setFrom(e.target.value)
                                let time = addTimes(e.target.value, '00:50')
                                setTo(time)
                                }} />
                        </Form.Group>

                        <Form.Group className={styles.time_sec_item}>
                        <Form.Label><b>Scheduling Time (To)</b></Form.Label>
                        <Form.Control
                                type="time"
                                required
                                className={styles.form_control}
                                value={to}
                                disabled={true}
                                onChange={(e) => { setTo(e.target.value) }} />
                        </Form.Group>
                        </div>

                        <Form.Group style={{ display: "flex", marginTop: "2rem" }}>
                        <Form.Check 
                                type="checkbox"
                                id={`default-warn`}
                                className={styles.check_warn}
                                checked={check}
                                onClick={() => setChecked(!check)}
                            />
                        <Form.Label className={styles.check_alert}>
                            <b>This setting will be for the entire semeseter and the 
                            configuration {"can't"} be changed.</b></Form.Label>
                        </Form.Group>

                        <div className={styles.btn_grp}>
                            <Button variant="primary" type="submit"
                                className={styles.submit}
                                disabled={!check}
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