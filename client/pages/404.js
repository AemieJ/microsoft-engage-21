import Head from "next/head"
import Image from "next/image"
import notFound from "../public/404.svg"
import { Row, Col, Button } from "react-bootstrap"
import styles from "../styles/404.module.css"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Scheduler - 404! </title>
        <meta
          name="description"
          content="An application for the students and faculty both like"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Col lg={6}>
          <Image src={notFound} alt="not found 404 image" />
        </Col>
        <Col className={styles.title}>
          <b>404!! {"You've"} landed on the wrong page!</b>
          <br />
          {"Don't worry"}, we will send you back to the safe place.
        </Col>
        <Button
          aria-label="Back to home"
          className={styles.home_btn}
          onClick={() => {
            window.location.href = "/"
          }}
        >
          Take me Home &nbsp; 🚀
        </Button>
      </div>
    </>
  )
}
