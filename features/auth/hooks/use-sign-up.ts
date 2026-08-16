import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { logIn } from '../api/log-in'
import { signUp } from '../api/sign-up'
import { useAuth } from '../context/AuthContext'
import { IAuthResponseDto, ISignUpPayload } from '../types/auth.dto'

export function useSignUp() {
  const { setSession } = useAuth()

  return useMutation<IAuthResponseDto, AxiosError<{ message: string }>, ISignUpPayload>({
    mutationFn: async (payload) => {
      await signUp(payload)
      return logIn({ email: payload.email, password: payload.password })
    },
    onSuccess: async (data) => {
      await setSession(data)
    },
  })
}
