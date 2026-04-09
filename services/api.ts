import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

const expoHost = Constants.expoConfig?.hostUri?.split(':')[0]
const envApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, '')

const fallbackApiUrl = Platform.select({
  android: 'http://10.0.2.2:3001',
  default: 'http://localhost:3001',
})

const inferredApiUrl = expoHost ? `http://${expoHost}:3001` : undefined

export const api = axios.create({
  baseURL: envApiUrl || inferredApiUrl || fallbackApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
