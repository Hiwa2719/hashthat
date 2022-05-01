import React, {useState} from "react";
import axios from "axios";
import Errors from "./Errors";


const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userErrors, setUserErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    const [formErrors, setFormErrors] = useState([])

    const submitForm = (e) => {
        e.preventDefault()
        axios.post('/login/', {username: username, password: password})
            .then(response => {
                props.onClose()
                props.setAuthenticated()
            })
            .catch(error => {
                setUserErrors(error.response.data.username)
                setPasswordErrors(error.response.data.password)
                setFormErrors(error.response.data['__all__'])
            })
    }
    const changeHandler = (e) => {
        setFormErrors([])
        if (e.target.id === 'username'){
            setUsername(e.target.value)
            setUserErrors([])
            return
        }
        setPassword(e.target.value)
        setPasswordErrors([])
    }

    return (
        <div className="login">
            <form onSubmit={submitForm}>
                <div className={formErrors && "mb-3"}>
                    <Errors errors={formErrors}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp"
                           onChange={changeHandler}/>
                    <Errors errors={userErrors}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password"
                           onChange={changeHandler}/>
                    <Errors errors={passwordErrors}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
