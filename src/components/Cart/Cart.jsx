import React, { useState, useContext } from 'react'
import Modal from '../Commons/Modal'
import classes from './Cart.module.css'
import Button from '../Commons/Button'
import QueryContext from '../../store/QueryContext'
import CartItem from './CartItem'



const Cart = (props) => {

  // 1. Context 적용 전.

  // 2. Context 적용 후.

  const queryContext = useContext(QueryContext)
  console.log(queryContext.query);

// console.log(props);

  const cartItems = (
    <ul className={classes['cart-items']}>
      <CartItem />
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