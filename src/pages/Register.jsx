import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {faCheck, faTimes, faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"
import "../index.css"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const {name, email, password, password2} = formData // formData is destructured

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
            [e.target.name]: e.target.value, // where name='name', name='email', name='password', name='password2'
        }))
    } 
    

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }
    
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="form">
                <h1>
                    <FontAwesomeIcon icon={faUser}/> My Registration
                </h1><br />
                <p> Please create an account</p>
            
                <form onSubmit={onSubmit}>

                    <label htmlFor="name">
                    Name: </label>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name"
                            value={name}
                            placeholder="Enter Your Name"
                            onChange={(onChange)} 
                        />
                    </div>

                    <label htmlFor="email">
                        Email: </label>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email"
                            value={email}
                            placeholder="Enter Your Email"
                            onChange={onChange}  
                        />
                        
                    </div>

                    <label htmlFor="password">
                        Password: </label>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={onChange}  
                        />
                        
                    </div>

                    <label htmlFor="password2">
                      Confirm Password: </label>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password2" 
                            name="password2"
                            value={password2}
                            placeholder="Confirm Password"
                            onChange={onChange} 
                        />
                    </div>

                    <div className="form-group">
                       <button type="submit" className="btn btn-block">
                        Submit
                       </button>
                    </div>
                </form>
            </section>
        </>
    )

}

export default Register
