import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../../features/auth/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let auth = useSelector((state) => state.auth)

    const handleLogOut = async () => {
        dispatch(logOut())
        navigate('/login', { replace: true });

    }

    return (
        <>
            <header>

                <div className='logo'>
                    <Link to={'/'}>PMT</Link>
                </div>

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
            </header >
            <hr />
        </>
    )
}

export default Header