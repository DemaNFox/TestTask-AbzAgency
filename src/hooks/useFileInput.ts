import { useState, ChangeEvent, useMemo } from "react"

type ValidatorParams = {
  maxFileSize?: number
  allowedTypes?: string[]
}

type ValidatorResult = string | null

export function useFileInput(params?: ValidatorParams) {
  const [value, setValue] = useState<FileList | null>(null)
  const [error, setError] = useState<ValidatorResult>(null)

  const validate = useMemo(
    () => (value: FileList | null) => {
      if (!params) return

      const { maxFileSize, allowedTypes } = params
      if (!value || value.length === 0) {
        setError("Файл не выбран")
      } else if (maxFileSize && value[0].size > maxFileSize) {
        setError(`Максимальный размер файла: ${maxFileSize} мб`)
      } else if (allowedTypes && allowedTypes.indexOf(value[0].type) === -1) {
        setError(`Неверный формат файла. Допустимые форматы: ${allowedTypes.join(", ")}`)
      } else {
        setError(null)
      }
    },
    [params]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    setValue(files)
    validate(files)
  }

  return { value, onChange: handleChange, error }
}

//====================== Пример использования  ====================================
/* const validatorParams = {
  maxFileSize: 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png'],
};

const { value, onChange, error } = useFileInput(validatorParams); */
