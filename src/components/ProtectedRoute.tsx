import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


interface Props {}

const ProtectedRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/auth" />
    return (
        <>{children}</>
    )
}


export default ProtectedRoute