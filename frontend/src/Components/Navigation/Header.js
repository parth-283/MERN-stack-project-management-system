import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../../features/auth/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let auth = useSelector((state) => state.auth)

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/login')
    }

    return (
        <header>
            <nav>
                <ul>
                    {auth.token ? <>
                        <li>
                            <NavLink to={`/dashboard`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/task`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Tasks </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/board`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Board </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" onClick={() => handleLogOut()}>Log out</NavLink>
                        </li>
                    </>
                        :
                        <>
                            <li>
                                <NavLink to={`/login`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Login </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/register`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Register </NavLink>
                            </li>
                        </>}
                </ul>
            </nav>
            <hr />
        </header >
    )
}

export default Header