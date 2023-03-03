import React from "react"
import cl from "./preloader.module.scss"
import svg from "../../../assets/Preloader.svg"

type Props = {}

const Preloader = (props: Props) => {
  return (
    <div className={cl.spinner}>
      <img
        src={svg}
        alt="loadnig..."></img>
    </div>
  )
}

export default Preloader
