import Head from 'next/head'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../../../styles/Dashboard.module.css'
import { server } from '../../../config/server.js'
import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'



export default function SubjectStudent({ code }) {
    const [subject, setSubject] = useState('')
    const [descrip, setDescrip] = useState('')
    const [days, setDays] = useState([])
    const [dates, setDate] = useState([])
    const [to, setTo] = useState([])
    const [from, setFrom] = useState([])
    const [tableData, setTable] = useState([])
    const [err, setErr] = useState(false)
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    useEffect(() => {
        const fetchSubject = async () => {
            let body = {
                email: localStorage.getItem("email"),
                accessToken: localStorage.getItem("accessToken"),
                code
            }

            let res = await fetch(`${server}/api/fetchSubject`, {
                method: "post",
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
                let lastWeek = parsed.lastWeek

                let length = parsed.days.length
                for (let i = 0; i < length; ++i) {
                    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    d.setUTCSeconds(lastWeek);

                    let given = week.indexOf(parsed.days[i])
                    while (d.getDay() !== given) {
                        d.setDate(d.getDate() + 1);
                    }

                    let pushDate = new Date(d.getTime());
                    let date = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()

                    let lst = [parsed.days[i], parsed.from[i], parsed.to[i], date, ""]
                    let table = tableData
                    table.push(lst)
                    setTable(table)

                    let datesLst = dates
                    datesLst.push(date)
                    setDate(datesLst)
                }

                let table = tableData
                table.sort((a, b) => {
                    return week.indexOf(a[0]) - week.indexOf(b[0])
                })
                setTable(table)
                setDays(parsed.days)
                setFrom(parsed.from)
                setTo(parsed.to)
                setSubject(parsed.name)
                setDescrip(parsed.description)
            }
        }

        fetchSubject()
    }, [])
    
    const addPreferences = async (e) => {
        e.preventDefault()
        let obj = []
        tableData.forEach((data) => {
            let inner = {
                date: data[3],
                mode: data[4]
            }
            obj.push(inner)
        })
        
        let body = {
            email: localStorage.getItem("email"),
            accessToken: localStorage.getItem("accessToken"),
            body: obj
        }
        console.log(body)
    }
    return (
        <>
            <div className={styles.title_sec}>
                <p className={styles.title}>{subject} - {code}</p>
            </div>
            <p className={styles.description}>The timetable is set for the subject and you can
            choose your preference every saturday. Based on your weekly preferences chosen, the
        section of preferences is showcased below the timetable so you can <b>join your class
        easily!</b></p>
            <p className={styles.description}><b style={{ color: "#1d37c2" }}>{descrip}</b></p>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Preference</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tableData.map((tableRow, idx) => {
                        return (
                            <tr>
                                <td>{tableRow[3]}</td>
                                <td>{tableRow[0]}</td>
                                <td>{tableRow[1]}</td>
                                <td>{tableRow[2]}</td>
                                <td><Button
                                className={styles.btn_preference}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (localStorage.getItem("remote")) {
                                        let row = tableRow
                                        row[4] = "Remote"
                                        tableData[idx] = row
                                        toast.notify("Preference added", {
                                            duration: 5,
                                            type: "success"
                                        })
                                        setErr(false)
                                    } else {
                                        toast.notify("Remote code not generated for you", {
                                            duration: 5,
                                            type: "error"
                                        })
                                        setErr(true)
                                    }
                                }}
                                >Remote</Button> / <Button
                                className={styles.btn_preference}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (localStorage.getItem("in_person")) {
                                        let row = tableRow
                                        row[4] = "Offline"
                                        tableData[idx] = row
                                        toast.notify("Preference added", {
                                            duration: 5,
                                            type: "success"
                                        })
                                        setErr(false)
                                    } else {
                                        setErr(true)
                                        toast.notify("Seat code not generated for you", {
                                            duration: 5,
                                            type: "error"
                                        })
                                    }
                                }}
                                >In-person</Button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
            className={styles.btn_preference_submit}
            disabled={err}
            onClick={addPreferences}
            >Submit Preference</Button>
            </div>
            <ToastContainer />
        </>
    )
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            code: context.query.code
        }
    }
}