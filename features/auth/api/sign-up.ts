import { api } from '@/services/api'
import { ISignUpPayload, ISignUpResponseDto } from '../types/auth.dto'

export async function signUp(payload: ISignUpPayload): Promise<ISignUpResponseDto> {
  const { data } = await api.post<ISignUpResponseDto>(`/api/auth/sign-up`, payload)
  return data
}
