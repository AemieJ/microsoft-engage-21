import React, { useEffect } from "react"
import { Row, Card, Col, Button } from "react-bootstrap"
import styles from "../styles/Dashboard.module.css"

const FacultySubjects = ({ subjects }) => {
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  // useEffect(() => {
  //     let item = Number(localStorage.getItem("lastWeek"))
  //     let today = new Date()
  //     let todayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()

  //     if (today.getDay() === 6) {
  //         if (item !== 0) {
  //             let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  //             d.setUTCSeconds(item);
  //             let pushDate = new Date(d.getTime());
  //             let date = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()
  //             if (todayDate !== date) {
  //                 let time = Math.round(today.getTime() / 1000)
  //                 localStorage.setItem("lastWeek", time)
  //             }
  //         } else {
  //             let time = Math.round(today.getTime() / 1000)
  //             localStorage.setItem("lastWeek", time)
  //         }
  //     }
  // }, [])
  return (
    <Row xs={1} md={1} lg={1} className={`g-4 ${styles.main}`}>
      {subjects.map((subject) => {
        return subject.days.map((day, idx) => {
          return (
            <Col key={`${subject.code}-${day}`} className={styles.fac_card}>
              <div className={styles.fac_sec}>
                <Row className={styles.fac_sec_title}>Subject Code</Row>
                <Row className={styles.fac_sec_description}>{subject.code}</Row>
              </div>
              <div className={styles.fac_sec}>
                <Row className={styles.fac_sec_title}>Day of Teaching</Row>
                <Row className={styles.fac_sec_description}>{day}</Row>
              </div>
              <div className={styles.fac_sec}>
                <Row className={styles.fac_sec_title}>Starting Time</Row>
                <Row className={styles.fac_sec_description}>
                  {subject.from[idx]}
                </Row>
              </div>
              <div className={styles.fac_sec}>
                <Row className={styles.fac_sec_title}>Ending Time</Row>
                <Row className={styles.fac_sec_description}>
                  {subject.to[idx]}
                </Row>
              </div>
              <div
                className={styles.fac_sec}
                style={{ marginLeft: "0", marginRight: "1rem" }}
              >
                <Row>
                  <Button
                    className={styles.fac_btn}
                    onClick={(e) => {
                      e.preventDefault()
                      localStorage.setItem("from", subject.from[idx])
                      localStorage.setItem("to", subject.to[idx])
                      let lastWeek = localStorage.getItem("lastWeek")
                      let d = new Date(0) // The 0 there is the key, which sets the date to the epoch
                      d.setUTCSeconds(lastWeek)
                      let given = week.indexOf(day)
                      while (d.getDay() !== given) {
                        d.setDate(d.getDate() + 1)
                      }
                      let pushDate = new Date(d.getTime())
                      let date =
                        pushDate.getDate() +
                        "-" +
                        (pushDate.getMonth() + 1) +
                        "-" +
                        pushDate.getFullYear()
                      window.location.href = `/subject/${subject.code}/${date}/preferences`
                    }}
                  >
                    Weekly Preferences
                  </Button>
                </Row>
              </div>
              {/* <div className={styles.fac_sec}>
                                    <Row>
                                    <Button className={styles.fac_btn}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        let lastWeek = localStorage.getItem("lastWeek")
                                        let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                                        d.setUTCSeconds(lastWeek);
                                        let given = week.indexOf(day)
                                        while (d.getDay() !== given) {
                                            d.setDate(d.getDate() + 1);
                                        }
                                        let pushDate = new Date(d.getTime());
                                        let date = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()                                        
                                        window.location.href = `/subject/${subject.code}/${date}/attendance`
                                    }}>Attendance</Button>
                                    </Row>
                                </div> */}
            </Col>
          )
        })
      })}
    </Row>
  )
}

export default FacultySubjects
