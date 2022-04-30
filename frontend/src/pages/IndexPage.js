import React from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'


export default class IndexPage extends React.Component {
    constructor() {
        super();
        this.state = {
            hash: null,
            text: '',
            isAuthenticated: null,
        }
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        axios.get('/check_authentication/')
            .then(response => {
                console.log(response)
                this.setState({
                    isAuthenticated: response.data.isAuthenticated
                })
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })
    }

    generateHash = () => {
        let text = this.state.text
        if (!text) return
        axios.get('/generate_hash/', {params: {text: text}})
            .then(response => {
                this.setState({
                    hash: response.data.hash,
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
        this.setState({
            hash: ''
        })
    }

    changeHandler = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const {toggleOpenModal, onclose} = this.props
        const isAuthenticated = this.state
        const {hash} = this.state
        return (
            <div className="index-page w-50 d-flex justify-content-center h-75">
                <div className="text-light bg-secondary w-75 p-1 rounded-1">
                    <div className="text-end pe-3 mb-3">
                        {isAuthenticated ?
                            (
                                <div>
                                    <Link to='/account/'>My Account</Link> / <Link to="/logout/">Logout</Link>
                                </div>
                            ) :
                            (
                                <div>
                                    <span onClick={() => toggleOpenModal(<Login onClose={onclose}/>)}>Login</span>
                                    <> /</>
                                    <span onClick={() => toggleOpenModal(<Register onClose={onclose}/>)}>Register</span>
                                </div>
                            )
                        }
                    </div>
                    <h1 className="text-center my-3">Please Enter your Text</h1>
                    <textarea className="w-100 text-area mt-3" placeholder="Enter Your text here"
                              ref={this.inputRef} onChange={this.changeHandler}></textarea>
                    <div className="hash-box text-center">{hash}</div>
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
