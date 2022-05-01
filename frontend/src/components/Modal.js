import React from "react";


const Modal = ({openModal, onClose, modalInner}) => {
    if (!openModal) return
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal-container bg-light w-50 h-50" onClick={(e)=>e.stopPropagation()}>
                <h5 className="close-button" onClick={onClose}>X</h5>
                {
                    modalInner
                }
            </div>
        </div>
    )
}


export default Modal
