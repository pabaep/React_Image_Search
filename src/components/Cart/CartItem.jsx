import React from 'react'
import classes from './CartItem.module.css'

const CartItem = (props) => {
  const url = "https://cdn.pixabay.com/photo/2021/03/16/21/46/tea-6101059_960_720.jpg"
  return (
    <div className={classes.cartItem}>
      <img className={classes.img} src={url} alt="결과 이미지"/>
    </div>
  )
}

export default CartItem