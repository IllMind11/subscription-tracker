export interface ISignInPayload {
  login: string
  password: string
}

export interface ISignInResponse {
  token: string
}

export interface ISignUpPayload {
  username: string
  email: string
  password: string
}

export interface ISignUpResponse {
  token: string
}

export interface IVerifyPayload {
  token: string
}

export interface IRefreshResponse {
  token: string
}
