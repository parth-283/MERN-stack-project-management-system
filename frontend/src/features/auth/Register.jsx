import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerAsync } from './authSlice.js'

const schema = yup
    .object({
        email: yup.string().email('Must be a valid email').required("This field is required."),
        firstName: yup.string().required("This field is required."),
        lastName: yup.string().required("This field is required."),
        phone: yup.string().required("This field is required."),
        password: yup.string().required("This field is required."),
    })
    .required()

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let auth = useSelector((state) => state.auth)

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            password: ""
        },
    })

    useEffect(() => {
        if (auth.status === 'register/success') {
            navigate('/login')
        }
    }, [auth])

    const onSubmit = async (data) => {
        dispatch(registerAsync(data))
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div> <h1>Register</h1> </div>
                {auth?.message.text && auth.message.page === 'register' &&
                    <>
                        <p className='error-message'>{auth?.message.text}</p>
                    </>
                }

                <div>
                    <label htmlFor='firstName' className='form-label'>First Name</label>
                    <input id="firstName" {...register("firstName")} placeholder='Enter your firstName' />
                    {errors.firstName && <p className='error-message'>{errors.firstName.message}</p>}
                </div>

                <div>
                    <label htmlFor='lastName' className='form-label'>Last Name</label>
                    <input id="lastName" {...register("lastName")} placeholder='Enter your lastName' />
                    {errors.lastName && <p className='error-message'>{errors.lastName.message}</p>}
                </div>

                <div>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input id="email" {...register("email")} placeholder='Enter your email' />
                    {errors.email && <p className='error-message'>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor='phone' className='form-label'>Phone</label>
                    <input id="phone" {...register("phone")} placeholder='Enter your phone' />
                    {errors.phone && <p className='error-message'>{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input id="password" {...register("password")} placeholder='Enter your password' />
                    {errors.password && <p className='error-message'>{errors.password.message}</p>}
                </div>

                <div className='button-group'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </>
    )
}

export default Register