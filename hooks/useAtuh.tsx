import { AuthenticationContext } from '@/app/context/AuthContext';
import { useContext } from 'react';
import axios from 'axios'


const useAuth = () => {
    const {data, loading, error, setAuthState} = useContext(AuthenticationContext)

    const signin = async ({email, password}: {email: string; password: string}) => {
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
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }
    const signup = async () => {}

    return {
        signin,
        signup
    }
}

export default useAuth