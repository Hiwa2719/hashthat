import React from "react";


const Errors = props => {
    const {errors} = props
    return (
        <div className="text-danger">
            {errors && errors.map((error, index) => <p className="p-0 m-0" key={index}>{error}</p>)}
        </div>
    )
}

export default Errors