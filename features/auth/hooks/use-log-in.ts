import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { logIn } from '../api/log-in'
import { useAuth } from '../context/AuthContext'
import { IAuthResponseDto, ILogInPayload } from '../types/auth.dto'

export function useLogIn() {
  const { setSession } = useAuth()

  return useMutation<IAuthResponseDto, AxiosError<{ message: string }>, ILogInPayload>({
    mutationFn: logIn,
    onSuccess: async (data) => {
      await setSession(data)
    },
  })
}
