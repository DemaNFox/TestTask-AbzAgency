import React from "react"
import MyButton from "../UI/MyButton/MyButton"
import cl from "./NavBar.module.scss"
import logo from "../../assets/Logo.svg"

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className={cl.menu}>
      <img
        src={logo}
        alt="logo"
        className={cl.menuLogo}
      />
      <div className={cl.menuButtons}>
        <MyButton>Users </MyButton>
        <MyButton> Sign up</MyButton>
      </div>
    </div>
  )
}

export default NavBar
