import React, { FC } from "react"
import classNames from "classnames"
import cl from "./Button.module.scss"

interface Props {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

const MyButton: FC<Props> = ({ children, disabled, onClick }) => {
  const btnClassName = classNames(cl.button, { [cl.disabled]: disabled })

  return (
    <>
      <button
        onClick={onClick}
        className={btnClassName}>
        {" "}
        {children}{" "}
      </button>
    </>
  )
}

export default MyButton
