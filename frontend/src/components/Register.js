import React, {useState} from "react";
import axios from "axios";


const Register = props => {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const submitForm = () => {
        axios.post('/register/', {username: username, password1: password1, password2: password2})
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
                    <label htmlFor="Password1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password1"
                           onChange={(e) => setPassword1(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password2" className="form-label">Password Again</label>
                    <input type="password" className="form-control" id="Password2"
                           onChange={(e) => setPassword2(e.target.value)}/>
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
