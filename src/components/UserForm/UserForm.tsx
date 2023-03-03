import {
  FC,
  useState,
  useMemo,
  ChangeEvent,
  useRef,
  DetailedHTMLProps,
  FormHTMLAttributes,
} from "react"
import successImage from "../../assets/success-image.svg"
import { IFileInput, IInput, IRadioInput } from "../../types/input"
import { Position } from "../../types/user"
import Heading from "../UI/Heading/Heading"
import MyInput from "../UI/Input/Input"
import MyButton from "../UI/MyButton/MyButton"
import RadioButton from "../UI/RadioButton/RadioButton"
import UploadInput from "../UI/UploadInput/UploadInput"
import cl from "./userForm.module.scss"

interface IProps {
  formConfig: FormConfig
}

export interface FormConfig {
  name: IInput
  email: IInput
  phone: IInput
  file: IFileInput
  positions: IRadioInput
  isValid: boolean
  submit: () => void
  sendSuccess: boolean
}

const UserForm: FC<IProps> = ({ formConfig }) => {
  const [selectedOption, setSelectedOption] = useState<object>({})

  return (
    <div className={cl.formWrapper}>
      {formConfig.sendSuccess && (
        <div className={cl.success}>
          <Heading>User successfully registered</Heading>
          <img
            src={successImage}
            alt="Success"></img>
        </div>
      )}

      {!formConfig.sendSuccess && (
        <form
          onSubmit={e => {
            e.preventDefault()
            formConfig.submit()
          }}
          className={cl.userForm}>
          <div className={cl.formInputs}>
            <MyInput
              value={formConfig.name.value}
              name={formConfig.name.name}
              error={formConfig.name.error}
              onChange={formConfig.name.onChange}
              onBlur={formConfig.name.onBlur}
              type="text"
            />
            <MyInput
              value={formConfig.email.value}
              name={formConfig.email.name}
              error={formConfig.email.error}
              onChange={formConfig.email.onChange}
              onBlur={formConfig.email.onBlur}
              type="text"
            />
            <MyInput
              value={formConfig.phone.value}
              name={formConfig.phone.name}
              helper={formConfig.phone.helper}
              onChange={formConfig.phone.onChange}
              error={formConfig.phone.error}
              onBlur={formConfig.phone.onBlur}
              type="number"
            />
          </div>
          <div className={cl.formPositions}>
            <span>Select your position</span>
            {formConfig.positions &&
              formConfig.positions.positionsList.map((pos, i) => (
                <RadioButton
                  key={pos.id}
                  position={pos}
                  radioName={formConfig.positions.name}
                  value={pos.name}
                  checked={selectedOption === pos ? true : false}
                  onChange={(e: any) => {
                    setSelectedOption(pos)
                    formConfig.positions.getSelected(pos)
                  }}
                />
              ))}
          </div>
          <div className={cl.formActions}>
            <UploadInput
              error={formConfig.file.error}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                formConfig.file.onChange(e)
                formConfig.file?.attach?.(e)
              }}
              reference={formConfig.file.reference}
            />
            <MyButton disabled={formConfig.isValid}>Sign up</MyButton>
          </div>
        </form>
      )}
    </div>
  )
}
export default UserForm
