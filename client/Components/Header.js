import { Navbar, Container, Nav } from 'react-bootstrap'
import styles from '../styles/Header.module.css'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-nextjs-toast'

const Header = () => {
    const [isLogged, setLogged] = useState(false)
    const [role, setRole] = useState(null)

    useEffect(() => {
        let getItem = localStorage.getItem("isLogged")
        if (getItem === '1') {
            setRole(localStorage.getItem("role"))
            setLogged(true)
        } else {
            setLogged(false)
        }
    })

    return (
        <Navbar className={styles.navbar} bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/" className={styles.mainLink}>Scheduler</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={`${styles.navbar_toggler} ${styles.navbar_toggler_icon}`} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                            <Nav.Link href="/" className={styles.link}>Home</Nav.Link>
                            {
                                !isLogged ? <></> : <Nav.Link href={`/dashboard/${localStorage.getItem("role")}`} className={styles.link}>Dashboard</Nav.Link>

                            }
                    </Nav>
                    {
                        !isLogged ? 
                        <Nav className="ms-auto">
                            <Nav.Link className={styles.link}
                            href="/register"
                            >Register</Nav.Link>
                            <Nav.Link className={styles.login_link}
                            href="/login"
                            >Login</Nav.Link>
                    </Nav>: 
                        <Nav className="ms-auto">
                        {
                            role === 'faculty' ? <Nav.Link className={styles.link}
                            href="/create"
                            >Create</Nav.Link> : <></>
                        }
                        {
                            role === 'faculty' ? <Nav.Link className={styles.link}
                            href="/timetable"
                            >Timetable</Nav.Link> : <></>
                        }
                        <Nav.Link className={styles.login_link}
                        onClick={() => {
                            let lastWeek = localStorage.getItem("lastWeek")
                            localStorage.clear()
                            localStorage.setItem("lastWeek", lastWeek)
                            window.location.href = "/"
                        }}>Logout</Nav.Link>
                </Nav>
                    }
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;