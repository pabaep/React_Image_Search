import React, { useContext, useEffect } from 'react'
import Modal from '../Commons/Modal'
import classes from './Cart.module.css'
import Button from '../Commons/Button'
import QueryContext from '../../store/QueryContext'
import ImageContext from '../../store/ImageContext'
import CartItem from './CartItem'



const Cart = (props) => {

  let queryContext = useContext(QueryContext)
  console.log(queryContext.query);

  let imageContext = useContext(ImageContext);
  console.log(imageContext.imageurl);
  
  let url = imageContext.imageurl.replace(/\"/gi, "");
  

  const cartItems = (
    <CartItem url={url}/>
  );

    const openAlert = () => {
        if(window.confirm("축하합니다! 원하는 이미지를 찾으셨군요!\n다운로드를 원하시면 '확인'버튼을 눌러주세요.\n새창에 나온 이미지를 다운받을 수 있습니다.")){
          window.open(url);
        }
    }

    useEffect(() => {
      console.log("업데이트가 됭서다");

      let text = queryContext.query;

    const textbox = {
      inText: text,
    };
    fetch("http://localhost:3001/text", { //text 주소에서 받을 예정
    method: "post", //통신방법
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(textbox), //textbox라는 객체를 보냄
  }).then(response => response.text()).then(imageContext.updateImage);

    }, [queryContext])

  const openRetry = () => {

  if(window.confirm("원하시는 이미지가 아니시군요! \n 만약 원하시는 이미지를 찾고 싶으시면 '확인'버튼을 눌러주세요.")){
    const text = queryContext.query;

    const keywordbox = {
      inText: text,
    };
    fetch("http://localhost:3001/keyword", { //text 주소에서 받을 예정
    method: "post", //통신방법
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(keywordbox), //textbox라는 객체를 보냄
  }).then(response => response.text()).then(queryContext.updateQuery);

  }


//   const keyword_text = queryContext.query;
//   console.log(keyword_text);
//   console.log("dddddd");
//   const textbox = {
//     inText: keyword_text,
//   };
//   fetch("http://localhost:3001/text", { //text 주소에서 받을 예정
//   method: "post", //통신방법
//   headers: {
//     "content-type": "application/json",
//   },
//   body: JSON.stringify(textbox), //textbox라는 객체를 보냄
// // }).then(response => response.text()).then(console.log));
// }).then(response => response.text()).then(imageContext.updateImage);

  }


  const modalButton = (
    <div className={classes.buttons}>
      <Button onClick={props.onClose}>Close</Button>
      <Button onClick={openRetry}>Retry</Button>
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