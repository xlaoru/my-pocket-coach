export interface ILogInPayload {
  email: string
  password: string
}

export interface ISignUpPayload {
  name: string
  email: string
  password: string
}

export interface ISignUpResponseDto {
  message: string
}

export interface IUserDto {
  id: string
  name: string
  email: string
}

export interface IAuthResponseDto {
  user: IUserDto
  accessToken: string
  refreshToken: string
}
