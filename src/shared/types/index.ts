export interface IUser {
  id: number
  email: string
  username: string
}

export interface IResponse<T> {
  message: string
  payload: T
}
