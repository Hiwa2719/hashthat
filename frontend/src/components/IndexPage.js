import React from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class IndexPage extends React.Component {
    constructor() {
        super();
        this.state = {
            hash: null,
        }
        this.inputRef = React.createRef()
    }

    generateHash = () => {
        axios.get('/generate_hash/')
            .then(response => {
                this.setState({
                    hash: response.data,
                })
            })
            .catch(error => {
                console.log('Error')
                console.log(error)
            })
    }
    saveHashHandler = () => {
        axios.post('/save-text-hash/', this.state.text)
            .then(response => {
                alert('Your text has been saved')
            })
            .catch(error => {
                console.log('Error')
                console.log(error)
            })

    }
    clearHandle = () => {
        this.inputRef.current.value = ''
    }

    loginHandler = () => {
        this.props.toggleOpenModal(<h1>hello world</h1>)
    }

    render() {
        const {toggleOpenModal, isAuthenticated} = this.props
        return (
            <div className="index-page w-50 d-flex justify-content-center h-75">
                <div className="text-light bg-secondary w-75 p-1 rounded-1">
                    <div className="text-end pe-3 mb-3" onClick={this.loginHandler}>
                        {isAuthenticated ?
                            (
                                <div>
                                    <Link to='/account/'>My Account</Link> / <span>Logout</span>
                                </div>
                            ) :
                            (
                                <div>
                                    <span>Login</span> / <span>Register</span>
                                </div>
                            )
                        }
                    </div>
                    <h1 className="text-center my-3">Please Enter your Text</h1>
                    <textarea className="w-100 text-area mt-3" placeholder="Enter Your text here"
                              ref={this.inputRef}></textarea>
                    <div className="hash-box"></div>
                    <div className="text-center mt-2">
                        <button className="mx-1 btn btn-success" onClick={this.generateHash}>Generate Hash</button>
                        <button className="mx-1 btn btn-warning" onClick={this.saveHashHandler}>Save Hash</button>
                        <button className="mx-1 btn btn-primary" onClick={this.clearHandle}>Clear Form</button>
                    </div>
                </div>
            </div>
        )
    }
}
