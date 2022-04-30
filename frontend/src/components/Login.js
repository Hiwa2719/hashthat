import React, {useContext, useState} from "react";
import axios from "axios";


const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        console.log('submitting')
        axios.post('/login/', {username: username, password: password})
            .then(response => {
                console.log('Success')
                props.onClose()
            })
            .catch(error => {
                console.log('error')
                console.log(error)
                // todo implement showing error messages
            })
    }

    return (
        <div className="login">
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp"
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password"
                           onChange={(e) => setPassword(e.target.value)}/>
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
