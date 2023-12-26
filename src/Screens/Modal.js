import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000000d1',
    zIndex: 10,
    maxHeight: "600px",
    width: '80%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    zIndex: 10
}

export default function Modal({ children, onClose }) {

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES} className="rounded" >
                <div className="container-fluid d-flex justify-content-end p-0">
                    <button className='btn btn-danger fs-6 btn-sm px-2 py-0 mt-3 me-3' onClick={onClose}> X </button>
                </div>
                {children}
            </div>
        </>,
        document.getElementById('cart-root')
    )
}