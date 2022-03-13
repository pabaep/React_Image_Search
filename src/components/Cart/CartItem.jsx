import React from 'react'
import classes from './CartItem.module.css'
import ReactLoading from "react-loading"

const CartItem = (props) => {

  const url = props.url;
  console.log(url)
  return (
    <>
    <div className={classes.cartItem}>
      {props.url ? <img className={classes.img} src={url} alt="결과 이미지"/> : <ReactLoading type="spin" color="#a3c9fe" height={100} />}
    </div>
    </>
  )
}

export default CartItem
