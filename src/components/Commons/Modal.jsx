import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Background = (props) => {
    return <div className={classes.background} onClick={props.onClose}/>
}

const ModalWindow = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}


// const dotenv = require('dotenv');
// dotenv.config();

// const clientId = process.env.client_id
// const clientSecret = process.env.CLIENT_SECRET


const CLIENT_ID='ON3loCSF2CLvnJMjKwAC'
const CLIENT_SECRET='ScY6DnsZFB'


const portalElement = document.getElementById('modal-window');

const Modal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(<Background onClose={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
    </>
  )
}


export default Modal