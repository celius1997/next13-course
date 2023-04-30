'use client'
import React, { useState, createContext } from 'react'

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