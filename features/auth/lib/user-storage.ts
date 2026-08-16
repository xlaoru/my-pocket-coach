import * as SecureStore from 'expo-secure-store'
import { IUserDto } from '../types/auth.dto'

const USER_KEY = 'authUser'

export const userStorage = {
  getUser: async (): Promise<IUserDto | null> => {
    const raw = await SecureStore.getItemAsync(USER_KEY)
    return raw ? JSON.parse(raw) : null
  },
  setUser: (user: IUserDto) => SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)),
  clearUser: () => SecureStore.deleteItemAsync(USER_KEY),
}
