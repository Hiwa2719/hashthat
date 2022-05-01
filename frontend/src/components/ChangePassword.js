import React, {useState} from "react";
import axios from "axios";
import Errors from "./Errors";


const ChangePassword = props => {
    const [oldPassword, setOldPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [oldPasswordErrors, setOldPasswordErrors] = useState([])
    const [password1Errors, setPassword1Errors] = useState([])
    const [password2Errors, setPassword2Errors] = useState([])


    const submitForm = (e) => {
        e.preventDefault()
        axios.post('/change-password/', {old_password: oldPassword, new_password1: password1, new_password2: password2})
            .then(response => {
                props.onClose()
                alert('your password changed successfully')
            })
            .catch(error => {
                console.log('error')
                console.log(error)
                setOldPasswordErrors(error.response.data.old_password)
                setPassword1Errors(error.response.data.new_password1)
                setPassword2Errors(error.response.data.new_password2)
            })
    }

    return (
        <div className="login">
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="old-password" className="form-label">Old Password</label>
                    <input type="password" className="form-control" id="old-password" aria-describedby="old-password"
                           onChange={(e) => {
                               setOldPasswordErrors([])
                               setOldPassword(e.target.value)
                           }}/>
                    <Errors errors={oldPasswordErrors}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password1" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="Password1"
                           onChange={(e) => {
                               setPassword1Errors([])
                               setPassword1(e.target.value)
                           }}/>
                    <Errors errors={password1Errors}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password2" className="form-label">New Password Again</label>
                    <input type="password" className="form-control" id="Password2"
                           onChange={(e) => {
                               setPassword2Errors([])
                               setPassword2(e.target.value)
                           }}/>
                    <Errors errors={password2Errors}/>
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

export default ChangePassword
