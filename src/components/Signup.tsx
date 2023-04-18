import { Dispatch, SetStateAction } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import axios from "axios"
import { UserType } from '../types';

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}


interface Props {
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
});


function Signup({ setIsLogin }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const { signin } = useAuth()

    const onSubmit = handleSubmit(async (values) => {
        try {
            const { data: { id, email, token } } = await axios.post<UserType>(`${process.env.REACT_APP_API_URL}/auth/signup`, { email: values.email, password: values.password })
            signin({ id, email, token })
        } catch (error) {
            console.log(error)
            alert("ERROR")
        }

    });
    return (
        <>
            <h1 className="text-center mb-3 font-black text-2xl">Signup</h1>

            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor='email' className="block text-grey-darker text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="email"
                        type="email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className="text-rose-700 text-xs italic py-1 text-right">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor='password' className="block text-grey-darker text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className="text-rose-700 text-xs italic py-1 text-right">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor='confirm-password' className="block text-grey-darker text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="confirm-password"
                        type="password"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <span className="text-rose-700 text-xs italic py-1 text-right">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <button className='text-sm text-sky-700 mb-4' onClick={() => setIsLogin(true)}>Already User? Sign In </button>
                <div className="flex justify-end">
                    <button
                        className="bg-sky-900 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default Signup