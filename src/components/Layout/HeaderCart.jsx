import React, { useContext, useState } from 'react'
import QueryContext from '../../store/QueryContext';
import classes from './HeaderCart.module.css'
import ImageContext from '../../store/ImageContext';

const HeaderCart = (props) => {

  const [text, setText] = useState('');
  const queryContext = useContext(QueryContext);
  const imageContext = useContext(ImageContext);

  const onChange = (e) => {
    // console.log(e.target);
    // console.log(e.target.value);
    setText(e.target.value);
  }

  const onBlur = () => {
    queryContext.updateQuery(text);

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

  };

  // queryContext.updateQuery(text);
  // console.log(queryContext.query);


  

  return (
    <>

    <input className={classes.input} type="text" id="word" placeholder="Type" onChange={onChange} onBlur={onBlur} value={text}/>
    <button className={classes.button} onClick={props.onOpen}>
        <span>검 색</span>
    </button>
    </>
  )
}

export default HeaderCart