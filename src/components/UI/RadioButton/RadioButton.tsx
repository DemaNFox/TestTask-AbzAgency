import { FC, ChangeEvent, KeyboardEvent } from "react"
import "react-tooltip/dist/react-tooltip.css"
import { findAncestor, NoSubstitutionTemplateLiteral } from "typescript"
import { Position } from "../../../types/user"
import cl from "./radiobutton.module.scss"
import { handleClick } from "./../../../utils/utils"

interface IProps {
  position: Position
  radioName: string
  value: string
  checked: boolean | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const initialValue: Position = {
  id: 0,
  name: "",
}

const RadioButton: FC<IProps> = ({
  position = initialValue,
  radioName,
  value,
  checked,
  onChange,
}) => {
  return (
    <label
      className={cl.label}
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => handleClick(e)}>
      <input
        type="radio"
        name={radioName}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span></span>
      {position.name}
    </label>
  )
}

export default RadioButton
