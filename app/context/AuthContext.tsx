'use client'
import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next';

interface user {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    city: string,
    phone: string
}
interface State {
    loading: boolean;
    error: string | null;
    data: user | null;
}
interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}
export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => {}
});

function AuthContext ({
    children
} : {
    children: React.ReactNode
}) {
    // Changing state
    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null, 
        error: null
    })
    // Fetch the user every time the app reloads or render
    const fetchUser = async() => {
        try {
            const jwt = getCookie('jwt')
            if(!jwt) {
                return setAuthState({
                    data: null,
                    error: null,
                    loading: false
                })
            }
            const response = await axios.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            
            // Ensure that every subsequent request has included this headers by default
            axios.defaults.headers.common["Authorization"] =  `Bearer ${jwt}`
    
            return setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }
    useEffect(()=> {
        fetchUser()
    }, [])
    // All of the children that are within this ContextProvider have access to the Auth state 
    // If the server components are children, then we can have a parent client component
    return (
        <div>
            <AuthenticationContext.Provider value={{
                ...authState,
                setAuthState
                }
            }>
            {children}
            </AuthenticationContext.Provider>
        </div>
    )
}

export default AuthContext