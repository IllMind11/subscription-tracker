export interface IUser {
  id: number
  email: string
  username: string
}

export interface IResponse<T> {
  message: string
  payload: T
}

export enum BillingPeriod {
  Dayly = 1,
  Weekly = 2,
  Monthly = 3,
  Yearly = 4,
}
