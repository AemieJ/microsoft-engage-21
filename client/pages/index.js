import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scheduler</title>
        <meta name="description" content="An application for the students and faculty both like" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Scheduler
        </h1>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>What? &rarr;</h2>
            <p>Schedular is an web application platform that will help in maintaining the 
              preferences and attendance of the students in classes in remote and in-person mode.
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Why? &rarr;</h2>
            <p>{"'Cause"} a student should be given the choice to study remote or in-person.
              On top of it, the faculty {"shouldn't"} be bothered with attendance and should be automated.
            </p>
          </a>

          <a
            href="#"
            className={`${styles.card} ${styles.card_last}`}
          >
            <h2>For who? &rarr;</h2>
            <p>This is a platform for the students and faculties. 
              Use it to the {"platform's"} maximum potential! 😃</p>
          </a>
        </div>
      </main>
    </div>
  )
}
