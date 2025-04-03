import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { loginAsync } from '../auth/authSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const schema = yup
    .object({
        email: yup.string().email('Must be a valid email').required("This field is required."),
        password: yup.string().required("This field is required."),
    })
    .required()

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let auth = useSelector((state) => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {
        dispatch(loginAsync(data))

        setTimeout(() => {
            if (auth.status === 'login/success') {
                navigate(["Team"].includes(auth.user.role) ? '/teams' : '/dashboard')
            }
        }, 200);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div> <h1>Login</h1> </div>
                {auth?.message.text && auth.message.page === 'login' &&
                    <>
                        <p className='error-message'>{auth?.message.text}</p>
                    </>
                }

                <div>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input id="email" {...register("email")} placeholder='Enter your email' />
                    {errors.email && <p className='error-message'>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input id="password" {...register("password")} placeholder='Enter your password' />
                    {errors.password && <p className='error-message'>{errors.password.message}</p>}
                </div>

                <div className='button-group'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </>
    )
}

export default Login