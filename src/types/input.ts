import { ChangeEvent, FocusEvent, LegacyRef } from "react"
import { ValidatorResult } from "../hooks/useInput"
import { Position } from "./user"

export interface IInput {
  value: string | number | readonly string[] | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error: false | ValidatorResult
  type?: string
  name?: string
  helper?: string
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

export interface IRadioInput {
  positionsList: Position[]
  getSelected: (pos: Position) => void
  name: string
}

export interface IFileInput {
  reference: LegacyRef<HTMLInputElement> | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error: string | null
  attach?: (e: ChangeEvent<HTMLInputElement>) => void
}
