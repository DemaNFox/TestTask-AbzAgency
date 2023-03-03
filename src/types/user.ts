export interface User {
  id: number
  name: string
  email: string
  phone: string
  position: string
  position_id: number
  registration_timestamp: number
  photo: string
}

export interface UserRootObject {
  success: boolean
  total_pages: number
  total_users: number
  count: number
  page: number
  users: User[]
}

export interface Position {
  id: number
  name: string
}

export interface PositionsRootObject {
  success: boolean
  positions: Position[]
}

export interface TokenRootObject {
  success: boolean
  token: string
}
