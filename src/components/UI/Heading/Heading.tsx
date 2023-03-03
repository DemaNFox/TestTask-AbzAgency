import { FC, ReactNode } from "react"
import cl from "./heading.module.scss"

interface HeaderProps {
  headerType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: ReactNode
}
const Heading: FC<HeaderProps> = ({ headerType = "h1", children }: HeaderProps) => {
  const HeaderTag = headerType

  return <HeaderTag className={cl.title}>{children}</HeaderTag>
}

export default Heading
