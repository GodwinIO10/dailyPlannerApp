import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"
import "./Login.css"


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData // formData is destructured

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        else if(isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

  
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value, // where name='email', name='password'
        }))
    } 
   
    const onSubmit = (e) => {
        e.preventDefault()

            const userData = {
                email,
                password,
            }
            dispatch(login(userData))
    }
    
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="form">
                <h1>
                    <FontAwesomeIcon icon={faSignInAlt}/> Login
                </h1><br />
                <p>Login and start planning your day</p>

                <form onSubmit={onSubmit}>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        required
                        name="email"
                        value={email}
                        placeholder="Enter Your Email"
                        onChange={onChange} 
                    />

                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        required
                        name="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={onChange} 
                    />
                
                    <button>Login</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="/register">Register</a>
                    </span>
                </p>
            </section>
        </>
    )
}

export default Login
