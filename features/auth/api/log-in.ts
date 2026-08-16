import { api } from '@/services/api'
import { IAuthResponseDto, ILogInPayload } from '../types/auth.dto'

export async function logIn(payload: ILogInPayload): Promise<IAuthResponseDto> {
  const { data } = await api.post<IAuthResponseDto>(`/api/auth/log-in`, payload)
  return data
}
