import Head from 'next/head'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../../../styles/Dashboard.module.css'
import { server } from '../../../config/server.js'
import { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap'

import Subjects from '../../../Components/Subjects.js'
import FacultySubjects from '../../../Components/FacultySubjects.js'
import ModalClass from '../../../Components/ModalClass.js'
import ResetModalClass from '../../../Components/ResetModalClass.js'
import ResetModalFac from '../../../Components/ResetModalFac.js'

export default function Dashboard({ roleURL }) {
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState(null)
    const [token, setToken] = useState(null)
    const [remote, setRemote] = useState("")
    const [person, setPerson] = useState("")
    const [subjects, setSubjects] = useState([])
    const [facSubs, setFacSubs] = useState([])
    const [date, setDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [resetModal, setResetModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [access, setAccess] = useState(true)

    const seatArrangement = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3",]

    useEffect(() => {
        let item = Number(localStorage.getItem("lastWeek"))
        console.log(item)
        let today = new Date()
        let todayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
        if (today.getDay() === 6) {
            if (item !== 0) {
                let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(item);
                let pushDate = new Date(d.getTime());
                let date = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()
                if (todayDate !== date) {
                    setResetModal(true)
                }
            } else {
                setResetModal(true)
            }
            setAccess(true)
        } else {
            if (item === 0) {
                setAccess(false)
            } else {
                setAccess(true)
            }
        }

        const fetchCode = async () => {
            const res = await fetch(`${server}/api/fetchCode`, {
                method: "post",
                body: localStorage.getItem("accessToken")
            });
            const { data, err } = await res.json();
            let parsed = JSON.parse(data) 
            let remoteCode = parsed.remote_code === null ? "" : parsed.remote_code
            let seatCode = parsed.seat === null ? "" : seatArrangement[parsed.seat - 1]

            setRemote(remoteCode)
            setPerson(seatCode)
            localStorage.setItem("remote", remoteCode)
            localStorage.setItem("in_person", seatCode)
            setRole("student")
            setEmail(localStorage.getItem("email"))
            setToken(localStorage.getItem("accessToken"))
        }

        const fetchUserSubjects = async () => {
            const res = await fetch(`${server}/api/fetchUserSubject`, {
                method: "post",
                body: JSON.stringify({
                    accessToken: localStorage.getItem("accessToken"),
                })
            });
            const { data, err } = await res.json();
            let parsed = JSON.parse(data)
            setSubjects(parsed) 
        }

        const fetchFacSubjects = async () => {
            setLoading(true)
            const res = await fetch(`${server}/api/fetchFacultySubject`, {
                method: "post",
                body: JSON.stringify({
                    accessToken: localStorage.getItem("accessToken"),
                    email: localStorage.getItem("email"),
                    lastWeek: localStorage.getItem("lastWeek")
                })
            });
            const { data, err } = await res.json();
            setLoading(false)
            let parsed = JSON.parse(data)
            setFacSubs(parsed) 
            setRole("faculty")
            setEmail(localStorage.getItem("email"))
            setToken(localStorage.getItem("accessToken"))
        }

        if (localStorage.getItem("role") === "student") {
            fetchCode()
            fetchUserSubjects()
        } else if (localStorage.getItem("role") === "faculty") {
            fetchFacSubjects()
        }
    }, []);

    const generateSeatCode = async (e) => {
        e.preventDefault()
        const res = await fetch(`${server}/api/generateSeat`, {
            method: "post",
            body: token
        })

        const { data, err } = await res.json()
        if (err) {
            toast.notify(err, {
                duration: 5,
                type: "error"
            })
        } else {
            let parsed = JSON.parse(data)
            if (parsed.seat !== null) {
                setPerson(seatArrangement[parsed.seat - 1])
                localStorage.setItem("in_person", seatArrangement[parsed.seat - 1])
            } else {
                toast.notify('No available seat for this week', {
                    duration: 5,
                    type: "error"
                })
            }
        }
    }

    const generateRemoteCode = async (e) => {
        e.preventDefault()
        let length = 6
        let code = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);

        let body = {
            accessToken: token,
            code
        }

        const res = await fetch(`${server}/api/generateRemote`, {
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
            setRemote(code)
            localStorage.setItem("remote", code)
        }
    }

    return (
        <>
        {
            loading ? <>
            <div className={styles.title_sec}>
                            <p className={styles.title}>Loading 🥺</p>
                        </div>
                <p className={styles.description}><b>The data is still being fetch, please be patient!</b></p>
            </> : <>
            <div className={styles.title_sec}>
                <p className={styles.title}>Dashboard</p>
                {
                    role === "student" ? <Button 
                    disabled={!access}
                    onClick={(e) => {
                        e.preventDefault()
                        // a modal popup 
                        setShowModal(true)
                    }}>Join Class</Button> : <></>
                }
            </div>
            {
                role === "student" ? <p className={styles.description}>As a student, you can join a new class, find a
            list of all your classes and your weekly codes as well. Once {"you've"} generated your codes
            for the week, it {"can't"} be regenerated. Hence, only choose to generate the remote code if you know
            you will attend classes through online mode, in-person code if you will attend classes through offline mode.
            You can generate both if you are planning to come with a mix of online and offline classes. <b>Be sure to attend and bunk less!</b></p> :
                    <p className={styles.description}>As a faculty, you can view the all the students weekly preferences and also
            keep track of the attendance for the week as well. The attendance is completely automated so {"don't"} worry
            and just go teach! 🚀</p>
            }
            {
                !access ? <>
                    <p className={styles.danger_msg}><b>You do not have access to the page yet and can 
                        be resetted on the coming saturday. </b></p>
                </> : <>
                        {
                            role === "student" ? <>
                                <div className={styles.codes}>
                                    <div style={{ color: "#1d37c2" }}><b>Generate remote class code? &nbsp; &nbsp; &nbsp; &nbsp;</b></div>
                                    <InputGroup className={styles.remote_inp}>
                                        <FormControl aria-label="Generate code"
                                            style={{ color: "#1d37c2", background: "#fdfdfd" }}
                                            placeholder="Click generate"
                                            value={remote}
                                            disabled={true}
                                            onChange={e => setRemote(e.target.value)} />
                                        <Button
                                            disabled={date.getDay() !== 6 || (remote !== null && remote !== "")}
                                            onClick={generateRemoteCode}
                                        >Generate</Button>
                                    </InputGroup>
                                </div>
                                <div className={styles.codes}>
                                    <div style={{ color: "#1d37c2" }}><b>Generate in-person seat code? &nbsp; &nbsp;</b></div>
                                    <InputGroup className={styles.remote_inp}>
                                        <FormControl aria-label="Generate code"
                                            style={{ color: "#1d37c2", background: "#fdfdfd" }}
                                            placeholder="Click generate"
                                            value={person}
                                            disabled={true}
                                            onChange={e => setPerson(e.target.value)} />
                                        <Button
                                            disabled={date.getDay() !== 6 || (person !== null && person !== "")}
                                            onClick={generateSeatCode}
                                        >Generate</Button>
                                    </InputGroup>
                                </div>
                                {
                                    date.getDay() !== 6 ? <p className={styles.danger_msg}><b>You {"can't"} make any generation for the entire week. Your weekly
            preferences are set and will be renewed on Saturday itself.</b></p> : <></>
                                }
                                <Subjects subjects={subjects} />
                                {
                                    showModal ? <ModalClass /> : <></>
                                }
                                {
                                    resetModal ? <ResetModalClass /> : <></>
                                }
                            </> : <>
                                {
                                    resetModal ? <ResetModalFac /> : <>
                                    <FacultySubjects subjects={facSubs} /></>
                                }
                                </>
                        }
                    </>
            }

            <ToastContainer />
            </>
        }
            
        </>
    )
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            roleURL: context.query.role
        }
    }
}