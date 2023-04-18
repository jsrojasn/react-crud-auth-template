import { createContext, useContext, useState, useEffect, FC, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom";
import { UserType } from "../types";
import { STORED_USER } from "../utils/constants";


interface AuthContextType {
    user: UserType | null;
    signin: (user: UserType) => void;
    signout: () => void
}

const getUser = () => {
    const user = localStorage.getItem(STORED_USER)

    if (user === null) {
        return null
    }

    return JSON.parse(user)
}

export const AuthContext = createContext<AuthContextType>(null!)

interface Props { }

export const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }: any) => {
    const [user, setUser] = useState<null | UserType>(getUser)

    const navigate = useNavigate()

    const signin = (user: UserType) => {
        setUser(user)
        navigate("/")
    }

    const signout = () => {
        setUser(null)
        navigate("/login")
    }

    useEffect(() => {
        localStorage.setItem(STORED_USER, JSON.stringify(user))
    }, [user])


    const value = { user, signin, signout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}