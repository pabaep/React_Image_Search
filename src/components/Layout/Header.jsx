import React from 'react'
import classes from './Header.module.css'
import HeaderCart from './HeaderCart'


const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
          <h1>책 주문 앱</h1>
          <HeaderCart onOpen={props.onOpen}/>
        </header>
    </>
  )
}

export default Header