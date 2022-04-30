import React, {useState} from "react";
import axios from "axios";
import Errors from "./Errors";


const Register = props => {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [userErrors, setUserErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])

    const submitForm = (e) => {
        e.preventDefault()
        axios.post('/register/', {username: username, password1: password1, password2: password2})
            .then(response => {
                props.onClose()
                props.setAuthenticated()
            })
            .catch(error => {
                console.log('error')
                console.log(error)
                setUserErrors(error.response.data.username)
                setPasswordErrors(error.response.data.password2)
                // todo implement showing error messages
            })
    }

    return (
        <div className="login">
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp"
                           onChange={(e) => {
                               setUserErrors([])
                               setUsername(e.target.value)
                           }}/>
                    <Errors errors={userErrors}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password1"
                           onChange={(e) => {
                               setPasswordErrors([])
                               setPassword1(e.target.value)
                           }}/>
                    <Errors errors={passwordErrors}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password2" className="form-label">Password Again</label>
                    <input type="password" className="form-control" id="Password2"
                           onChange={(e) => {
                               setPasswordErrors([])
                               setPassword2(e.target.value)
                           }}/>
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

export default Register
