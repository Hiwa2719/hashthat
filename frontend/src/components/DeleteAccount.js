import React from "react";
import withRouter from './withRouter'
import axios from "axios";


class DeleteAccount extends React.Component {
    deleteHandler = () => {
        axios.get('/delete_account/')
            .then(response => {
                this.props.onClose()
                this.props.navigate('/')
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })
    }

    render() {
        const onClose = this.props.onClose
        return (
            <div className="delete-account text-center">
                <h1>Are you Sure to delete your account?!?</h1>
                <small>your data will be wiped out permanently</small>
                <div className="my-3">
                    <button className="btn btn-danger me-2 px-4" onClick={this.deleteHandler}>Yes</button>
                    <button className="btn btn-success ms-2" onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default withRouter(DeleteAccount)