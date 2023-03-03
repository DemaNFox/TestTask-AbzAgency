import { ChangeEvent, FC, KeyboardEvent, KeyboardEventHandler, useState } from "react"
import cl from "./UploadInput.module.scss"
import { IFileInput, IInput } from "./../../../types/input"
import { handleClick } from "../../../utils/utils"
import classNames from "classnames"

const UploadInput: FC<IFileInput> = ({ error, reference, onChange }) => {
  const [inputFileName, setInputFileName] = useState<string>("Upload your photo")

  const setFileName = (e: any) => {
    const target = e.target
    if (target.files[0]) {
      const fileName = target.files[0].name
      setInputFileName(fileName)
      return
    }
    setInputFileName("Upload your photo")
  }

  return (
    <>
      <div className={classNames(cl.uploadInput, { [cl.error]: error })}>
        <label
          className={classNames(cl.inputLabel, { [cl.error]: error })}
          htmlFor="a1"
          onKeyDown={(e: KeyboardEvent) => handleClick(e)}
          tabIndex={0}>
          Upload
        </label>
        <span className={cl.filePrev}>{inputFileName}</span>
        <input
          ref={reference}
          id="a1"
          type="file"
          onChange={e => {
            setFileName(e)
            onChange(e)
          }}
          className={cl.input}
        />
      </div>
      <span className={cl.inputError}>{error}</span>
    </>
  )
}

export default UploadInput
