import {useNavigate} from "react-router-dom";
import React from "react";


const withRouter = (Component) => {
    const Wrapper = props => {
        const navigate = useNavigate()
        return <Component navigate={navigate} {...props}/>
    }
    return Wrapper
}

export default withRouter