import { FC, ChangeEvent } from "react"
import classNames from "classnames"
import cl from "./MyInput.module.scss"
import { IInput } from "../../../types/input"

const MyInput: FC<IInput> = ({ name, value, helper, error, onChange, onBlur, type }) => {
  return (
    <div className={cl.inputElement}>
      <div className={classNames(cl.myInput, { [cl.error]: error })}>
        <span className={classNames(cl.inputHelper, cl.label, { [cl.error]: error })}>{name}</span>
        <input
          type={type}
          className={classNames(cl.input)}
          placeholder={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      <span className={classNames(cl.inputHelper, cl.error)}>{error}</span>
      <span className={cl.inputHelper}>{helper}</span>
    </div>
  )
}

export default MyInput
