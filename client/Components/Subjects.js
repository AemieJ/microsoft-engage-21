import React from "react"
import { Row, Card, Col, Button } from 'react-bootstrap'
import styles from '../styles/Dashboard.module.css'

const Subjects = ({ subjects }) => {
    return (
        <Row xs={1} md={2} lg={3} className={`g-4 ${styles.main}`}>
            {subjects.map((subject) => {
                return (
                    
                        <Col key={subject.code}>  
                        <Card style={{ width: '18rem', borderRadius: '1.5rem' }}>
                <Card.Header variant="top" className={styles.card_header}
                ><b>{subject.subject} - {subject.code}</b></Card.Header>
                        <Card.Body>
                            <Card.Body className={styles.card_body}>
                            Click the button to go the class, <b>choose your preferences and attend the classes</b> as per schedule.
                            </Card.Body>
                            <Button variant="primary"
                            onClick={(e) => {
                                e.preventDefault()
                            }}>Class</Button>
                        </Card.Body>
                    </Card>
                        </Col>
                );
            })}
        </Row>
    );
};

export default Subjects;