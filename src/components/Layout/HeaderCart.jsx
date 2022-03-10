import React, { useState } from 'react'
import classes from './HeaderCart.module.css'

const HeaderCart = (props) => {

  const [text, setText] = useState('');

  const onChange = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    setText(e.target.value);
  }

  return (
    <>
    <input type="text" id="word" placeholder="Type" onChange={onChange} value={text}/>
    <button className={classes.button} onClick={props.onOpen}>
        <span>검색</span>
    </button>
    </>
  )
}

export default HeaderCart