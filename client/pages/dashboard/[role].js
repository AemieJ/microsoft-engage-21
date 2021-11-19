import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Dashboard.module.css'
import { server } from '../../config/server.js'
import { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import Subjects from '../../Components/Subjects.js'


export default function Dashboard() {
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState(null)
    const [token, setToken] = useState(null)
    const [remote, setRemote] = useState(null)
    const [person, setPerson] = useState(null)
    const [subjects, setSubjects] = useState([])

    useEffect(()=>{
        const fetchCode = async () => {
          const res = await fetch(`${server}/api/fetchCode`, {
              method: "post", 
              body: JSON.stringify({
                  accessToken: localStorage.getItem("accessToken"), 
                  email: localStorage.getItem("email")
              })
          });
          const {data, err} = await res.json();
          let parsed = JSON.parse(data)
          
          setRemote(parsed.remote)
          setPerson(parsed.in_person)
          setRole("student")
          setEmail(localStorage.getItem("email"))
          setToken(localStorage.getItem("accessToken"))
        }

        const fetchUserSubjects = async () => {
            const res = await fetch(`${server}/api/fetchUserSubject`, {
                method: "post", 
                body: JSON.stringify({
                    accessToken: localStorage.getItem("accessToken"), 
                    email: localStorage.getItem("email")
                })
            });
            const {data, err} = await res.json();
            let parsed = JSON.parse(data)
            setSubjects(parsed)
        }

        if (localStorage.getItem("role") === "student") {
            fetchCode()
            fetchUserSubjects()
        }
      }, []);
    
    return (
        <>
        <div className={styles.title_sec}>
        <p className={styles.title}>Dashboard</p>
        <Button>Join Class</Button>
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
        <div className={styles.codes}>
            <div style={{ color: "#1d37c2" }}><b>Generate remote class code? &nbsp; &nbsp; &nbsp; &nbsp;</b></div>
            <InputGroup className={styles.remote_inp}>
                <FormControl aria-label="Generate code" 
                style={{ color: "#1d37c2", background: "#fdfdfd"}}
                placeholder="Click generate"
                value={remote}
                disabled={true}
                onChange={e => setRemote(e.target.value)} />
                <Button
                disabled={remote !== null && remote !== ""}
                >Generate</Button>
            </InputGroup>
        </div>
    
        <div className={styles.codes}>
            <div style={{ color: "#1d37c2" }}><b>Generate in-person seat code? &nbsp; &nbsp;</b></div>
            <InputGroup className={styles.remote_inp}>
                <FormControl aria-label="Generate code" 
                style={{ color: "#1d37c2", background: "#fdfdfd"}}
                placeholder="Click generate"
                value={person}
                disabled={true}
                onChange={e => setPerson(e.target.value)} />
                <Button
                disabled={person !== null && person !== ""}
                >Generate</Button>
            </InputGroup>
        </div>
        <Subjects subjects={subjects} />
            
        </>
    )
}