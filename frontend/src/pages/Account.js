import React from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import HashTable from '../components/HashTable'
import DeleteAccount from "../components/DeleteAccount";

export default class Account extends React.Component {
    logoutHandler = () => {
        axios.get('/logout/')
            .catch(error => {
                console.log('error')
                console.log(error)
            })
    }

    hashList = () => {
        axios.get('/hash_list/')
            .then(response => {
                let hashes =response.data
                this.props.toggleOpenModal(<HashTable hashes={hashes}/>)
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })
    }

    deleteHandler = () => {
        this.props.toggleOpenModal(<DeleteAccount onClose={this.props.onclose}/>)
    }

    render() {
        return (
            <div>
                <Link to="/" className="btn btn-secondary">Home</Link>
                <button className="text-hash-list btn btn-success mx-1 my-3" onClick={this.hashList}>Display saved
                    Text/Hash
                </button>
                <button className="pass-change btn btn-primary mx-1 my-3">Change password</button>
                <Link className="logout btn btn-warning mx-1 my-3" to="/" onClick={this.logoutHandler}>logout</Link>
                <button className="btn btn-danger mx-1 my-3" onClick={this.deleteHandler}>Delete Account</button>
            </div>
        )
    }
}