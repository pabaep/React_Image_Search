import React from 'react'
import classes from './HeaderCart.module.css'

const HeaderCart = (props) => {
  return (
    <button className={classes.button} onClick={props.onOpen}>
        <span>내 장바구니</span>
    </button>
  )
}

export default HeaderCart