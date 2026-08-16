import { queryClient } from '@/lib/query/query-client'
import { setUnauthorizedHandler, tokenStorage } from '@/services/api'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { userStorage } from '../lib/user-storage'
import { IAuthResponseDto, IUserDto } from '../types/auth.dto'

interface AuthContextValue {
    user: IUserDto | null
    isAuthenticated: boolean
    isLoading: boolean
    setSession: (auth: IAuthResponseDto) => Promise<void>
    logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<IUserDto | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function setSession(auth: IAuthResponseDto) {
        await tokenStorage.setTokens(auth.accessToken, auth.refreshToken)
        await userStorage.setUser(auth.user)
        setUser(auth.user)
    }

    async function logOut() {
        await tokenStorage.clearTokens()
        await userStorage.clearUser()
        queryClient.clear()
        setUser(null)
    }

    useEffect(() => {
        setUnauthorizedHandler(() => logOut())
    }, [])

    useEffect(() => {
        ; (async () => {
            const [storedUser, accessToken, refreshToken] = await Promise.all([
                userStorage.getUser(),
                tokenStorage.getAccessToken(),
                tokenStorage.getRefreshToken(),
            ])

            if (storedUser && (accessToken || refreshToken)) {
                setUser(storedUser)
            }

            setIsLoading(false)
        })()
    }, [])

    const value = useMemo<AuthContextValue>(
        () => ({ user, isAuthenticated: !!user, isLoading, setSession, logOut }),
        [user, isLoading],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
