import React from "react"
import { faSignInAlt, faSignOutAlt, faUser, faDashboard, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"
import "./Header.css"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) =>  state.auth )

    const onLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    return (
        <header className="header">
                <div>
                    <Link to="/dashboard">
                     <FontAwesomeIcon icon={faHome} /> Home
                    </Link>
                </div><br />
                <div className="logo">
                    <Link to="/admin">
                        <FontAwesomeIcon icon={faDashboard} /> Admin
                    </Link>
                </div><br />
                <ul>
                    { user ? (
                        <li className="logo">
                            <button className="btn" onClick={onLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                            </button>
                        </li>
                    ) : (<>
                            <li className="logo">
                                <Link to="/login">
                                    <FontAwesomeIcon icon={faSignInAlt}/> Login
                                </Link>
                            </li><br />
                            <li className="logo">
                                <Link to="/register">
                                    <FontAwesomeIcon icon={faUser}/> Registration
                                </Link>
                            </li>
                        </>)}
                    
                </ul>
        </header>
    )
}

export default Header
