import React, { useContext } from 'react'
import Modal from '../Commons/Modal'
import classes from './Cart.module.css'
import Button from '../Commons/Button'
import QueryContext from '../../store/QueryContext'
import ImageContext from '../../store/ImageContext'
import CartItem from './CartItem'



const Cart = (props) => {

  const queryContext = useContext(QueryContext)
  console.log(queryContext.query);

  const imageContext = useContext(ImageContext);
  console.log(imageContext.imageurl);
  
  const url = "https://cdn.pixabay.com/photo/2021/03/16/21/46/tea-6101059_960_720.jpg"

// console.log(props);

  const cartItems = (
    <CartItem url={url}/>
  );

    const openAlert = () => {
        if(window.confirm("축하합니다! 원하는 이미지를 찾으셨군요!\n다운로드를 원하시면 '확인'버튼을 눌러주세요.\n새창에 나온 이미지를 다운받을 수 있습니다.")){
          window.open(url);
        }
    }

  const modalButton = (
    <div className={classes.buttons}>
      <Button onClick={props.onClose}>Close</Button>
      <Button>Retry</Button>
      <Button onClick={openAlert}>Correct</Button>
    </div>
  );
  
  const cartModalContent = (
    <>
      {cartItems}
      {/* 취소, 주문 버튼(modalButton) */}
      {modalButton}
    </>
  )

  return <Modal onClose={props.onClose}>{cartModalContent}</Modal>;
}

export default Cart