// import styles from '../styles/ScrollTop.module.css'
import Image from "next/image"
import { Button } from "react-bootstrap"
import { useEffect } from "react"
import arrow from "../public/arrow-up.svg"

const ScrollTop = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset !== 0) {
          document.querySelector("button#scroll").style.display = "block"
        } else {
          document.querySelector("button#scroll").style.display = "none"
        }
      })
    }
  }, [])

  return (
    <>
      <Button
        aria-label="Scroll up"
        id="scroll"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo(0, 0)
        }}
      >
        <Image src={arrow} alt="Scroll top icon" />
      </Button>
    </>
  )
}

export default ScrollTop
