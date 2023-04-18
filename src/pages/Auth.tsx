import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useAuth } from '../contexts/AuthContext'

function Auth() {
    const [isLogin, setIsLogin] = useState(true)

    const { user } = useAuth()

    if (user) return <Navigate to="/" />

    return (
        <div className="w-full h-screen border flex items-center justify-center">
            <div className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                {isLogin ?
                    <Login setIsLogin={setIsLogin} /> : <Signup setIsLogin={setIsLogin} />}

            </div>
        </div >
    )
}

export default Auth