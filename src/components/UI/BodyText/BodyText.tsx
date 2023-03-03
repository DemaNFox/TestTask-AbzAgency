import React, { FC } from "react"
import cl from "./BodyText.module.scss"

interface Props {
  children: React.ReactNode
}

const BodyText: FC<Props> = ({ children }) => {
  return (
    <>
      <p className={cl.text}> {children}</p>
    </>
  )
}

export default BodyText
