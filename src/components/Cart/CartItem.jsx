import React from 'react'
import classes from './CartItem.module.css'

const CartItem = (props) => {
  return (
    <li className={classes['cart-item']}>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
            <span className={classes.price}>$ {props.price}</span>
            <span className={classes.amount}>x {props.amount}</span>
        </div>
    </li>
  )
}

export default CartItem