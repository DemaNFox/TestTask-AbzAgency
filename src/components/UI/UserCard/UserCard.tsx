import { FC } from "react"
import { Tooltip } from "react-tooltip"
import userDefaultUserPhoto from "../../../assets/photo-cover.svg"
import cl from "./UserCard.module.scss"
import "./tooltip.scss"

interface IProps {
  user?: IUser
}

export interface IUser {
  photo: string
  name: string
  email: string
  phone: string
  position: string
  id: number
}

const initialValueUser: IUser = {
  photo: "",
  name: "",
  email: "",
  phone: "",
  position: "0",
  id: 0,
}

const UserCard: FC<IProps> = ({ user = initialValueUser }) => {
  return (
    <div className={cl.userCard}>
      <img
        src={user.photo || userDefaultUserPhoto}
        className={cl.userPhoto}
        alt="user-photo"></img>
      <span
        data-tooltip-id={"my-tooltip-name " + user.id}
        data-tooltip-content={user.name}>
        {user.name}
      </span>
      <div className={cl.userInfo}>
        <span
          data-tooltip-id={"my-tooltip-position " + user.id}
          data-tooltip-content={user.position}>
          {user.position}
        </span>
        <span
          data-tooltip-id={"my-tooltip-email " + user.id}
          data-tooltip-content={user.email}>
          {user.email}
        </span>
        <span>{user.phone}</span>
      </div>
      <Tooltip
        id={"my-tooltip-name " + user.id}
        className="styles-module_tooltip__mnnfp"
      />
      <Tooltip
        id={"my-tooltip-position " + user.id}
        className="styles-module_tooltip__mnnfp"
      />
      <Tooltip
        id={"my-tooltip-email " + user.id}
        className="styles-module_tooltip__mnnfp"
      />
    </div>
  )
}

export default UserCard
