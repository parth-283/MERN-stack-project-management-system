import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logOutAsync } from '../../features/auth/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let auth = useSelector((state) => state.auth)

    const handleLogOut = async () => {
        dispatch(logOutAsync())
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 200)
    }

    return (
        <>
            <header>

                <div className='logo'>
                    <Link to={auth.isAuth ? '/dashboard' : "/login"}>PMT</Link>
                </div>

                <nav>
                    <ul>
                        {auth.isAuth ? <>
                            {["Admin"].includes(auth.user.role) && <li>
                                <NavLink to={`/dashboard`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Dashboard</NavLink>
                            </li>}
                            {['Manager', 'Team'].includes(auth.user.role) && <li>
                                <NavLink to={`/task`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Tasks </NavLink>
                            </li>}
                            {!["Admin", "Manager"].includes(auth.user.role) && <li>
                                <NavLink to={`/board`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Board </NavLink>
                            </li>}
                            {['Admin', 'Team', 'Manager'].includes(auth.user.role) && <li>
                                <NavLink to={`/teams`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}> Teams </NavLink>
                            </li>}
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