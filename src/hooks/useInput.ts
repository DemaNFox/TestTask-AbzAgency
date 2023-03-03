import { useState, useMemo, ChangeEvent, FocusEvent } from "react"

type ValidatorParams = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
}

export type ValidatorResult = string | null

export function useInput(params?: ValidatorParams) {
  const [value, setValue] = useState<string | number>("")
  const [touched, setTouched] = useState<boolean>(false)

  const validate = useMemo(() => {
    if (!params) return () => null

    const { required, minLength, maxLength, pattern } = params

    return (value: string | number): ValidatorResult => {
      if (required && !value) {
        return "Поле обязательно для заполнения"
      } else if (minLength && value.toString().length < minLength) {
        return `Минимальная длина поля: ${minLength} символов`
      } else if (maxLength && value.toString().length > maxLength) {
        return `Максимальная длина поля: ${maxLength} символов`
      } else if (pattern && !pattern.test(value.toString())) {
        return "Неверный формат поля"
      } else {
        return null
      }
    }
  }, [params])

  const error = touched && validate(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setTouched(true)
  }

  return { value, onChange: handleChange, onBlur: handleBlur, error }
}

//======================= Пример использования  ===================================
/* const validatorParams = {
  required: true,
  minLength: 3,
  maxLength: 20,
  pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
};

const { value, onChange, onBlur, error } = useTextInput(validatorParams);
 */
