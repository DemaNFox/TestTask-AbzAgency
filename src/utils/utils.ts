import { KeyboardEvent } from "react"

export function handleClick(e: KeyboardEvent<Element>): void {
  if (e.code === "Enter" || e.code === "Space") {
    const target = e.target as HTMLInputElement
    target.click()
  }
}
