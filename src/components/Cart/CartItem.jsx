import React from 'react'
import classes from './CartItem.module.css'

const CartItem = (props) => {

  
  const url = props.url;
  // console.log(typeof url);
  return (
    <div className={classes.cartItem}>
      <img className={classes.img} src={url} alt="결과 이미지"/>
    </div>
  )
}

export default CartItem