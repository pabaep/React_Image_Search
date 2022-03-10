import React, { useState, useContext } from 'react'
import Modal from '../Commons/Modal'
import classes from './Cart.module.css'
import Button from '../Commons/Button'



const Cart = (props) => {

  // 1. Context 적용 전.

  // 2. Context 적용 후.

// console.log(props);

  const cartItems = (
    <ul className={classes['cart-items']}>
      
    </ul>
  );



  const modalButton = (
    <div className={classes.buttons}>
      <Button onClick={props.onClose}>Close</Button>
      <Button>Order</Button>
    </div>
  );
  
  const cartModalContent = (
    <>
      {/* 장바구니 목록(cartItems) */}
      {cartItems}
      {/* 장바구니 목록 총 합(cartItemsTotal) */}
      {/* 취소, 주문 버튼(modalButton) */}
      {modalButton}
    </>
  )

  return <Modal onClose={props.onClose}>{cartModalContent}</Modal>;
}

export default Cart