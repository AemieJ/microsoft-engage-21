import { Navbar, Container, Nav } from 'react-bootstrap'
import styles from '../styles/Header.module.css'
import { useState, useEffect } from 'react'

const Header = () => {
    const [isLogged, setLogged] = useState(false)

    useEffect(() => {
        let getItem = localStorage.getItem("isLogged")
        if (getItem === '1') {
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
                                !isLogged ? <></> : <Nav.Link href="/dashboard" className={styles.link}>Dashboard</Nav.Link>

                            }
                    </Nav>
                    {
                        !isLogged ? 
                        <Nav className="ms-auto">
                            <Nav.Link href="/register" className={styles.link}>Register</Nav.Link>
                            <Nav.Link href="/login" className={styles.login_link}>Login</Nav.Link>
                    </Nav>: 
                        <Nav className="ms-auto">
                        <Nav.Link className={styles.login_link}
                        onClick={() => {
                            localStorage.removeItem("isLogged")
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