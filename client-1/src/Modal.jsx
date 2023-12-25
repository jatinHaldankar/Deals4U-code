import React from 'react'
import ReactDom from 'react-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%',
    border: '2px solid white',
}

const iconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: 'white',
  };

const Modal = (props) => {
    const children = props.children;
    const onClose = props.onClose;

    return ReactDom.createPortal(
        <div style={modalStyle}>
            <CancelIcon onClick={onClose}  style={iconStyle}/>
            {children}
        </div>, document.getElementById("cart-root")
    );
}

export default Modal;