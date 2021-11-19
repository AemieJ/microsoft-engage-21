import React from "react"
import { Row, Card, Col, Button } from 'react-bootstrap'
import styles from '../styles/Dashboard.module.css'

const FacultySubjects = ({ subjects }) => {
    return (
        <Row xs={1} md={1} lg={1} className={`g-4 ${styles.main}`}>
            {subjects.map((subject) => {
                return (
                    subject.days.map((day) => {
                        return (
                            <Col key={`${subject.subject}-${day}`} className={styles.fac_card}>
                                <div className={styles.fac_sec}>
                                    <Row className={styles.fac_sec_title}>Subject Code</Row>
                                    <Row className={styles.fac_sec_description}>{subject.subject}</Row>
                                </div>
                                <div className={styles.fac_sec}>
                                    <Row className={styles.fac_sec_title}>Day of Teaching</Row>
                                    <Row className={styles.fac_sec_description}>{day}</Row>
                                </div>
                                <div className={styles.fac_sec}>
                                    <Row>
                                    <Button className={styles.fac_btn}>Weekly Preferences</Button>
                                    </Row>
                                </div>
                                <div className={styles.fac_sec}>
                                    <Row>
                                    <Button className={styles.fac_btn}>Attendance</Button>
                                    </Row>
                                </div>
                            </Col>
                        )
                    })
                );
            })}
        </Row>
    );
};

export default FacultySubjects;