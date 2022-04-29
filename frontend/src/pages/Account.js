import React from "react";
import {Link} from 'react-router-dom'

export default class Account extends React.Component {
    render() {
        return (
            <div>
                <Link to="/" className="btn btn-secondary">Home</Link>
                <button className="text-hash-list btn btn-success mx-1 my-3">Display saved Text/Hash</button>
                <button className="pass-change btn btn-primary mx-1 my-3">Change password</button>
                <Link className="logout btn btn-warning mx-1 my-3" to="/">logout</Link>
                <Link to="/" className="btn btn-danger mx-1 my-3">Delete Account</Link>
            </div>
        )
    }
}