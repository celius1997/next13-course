import { AuthenticationContext } from '@/app/context/AuthContext';
import { useContext } from 'react';
import axios from 'axios'


const useAuth = () => {
    const {data, loading, error, setAuthState} = useContext(AuthenticationContext)

    const signin = async ({email, password}: {email: string; password: string}, handleClose: () => void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const response = await axios.post('/api/auth/signin', {
                email,
                password
            })
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose()
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }
    const signup = async (
        {   email,
            password,
            firstName,
            lastName,
            city,
            phone
        }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            city: string;
            phone: string
        }, handleClose: () => void) => {
            setAuthState({
                data: null,
                error: null,
                loading: true
            })
            try {
                const response = await axios.post('/api/auth/signup', {
                    email,
                    password,
                    firstName,
                    lastName,
                    city,
                    phone
                })
                setAuthState({
                    data: response.data,
                    error: null,
                    loading: false
                })
                handleClose()
            } catch (error: any) {
                setAuthState({
                    data: null,
                    error: error.response.data.errorMessage,
                    loading: false
                })
            }
        }

    return {
        signin,
        signup
    }
}

export default useAuth