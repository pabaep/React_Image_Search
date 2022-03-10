import React from 'react'
import classes from './Header.module.css'
import HeaderCart from './HeaderCart'
import Search from './Search'

const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
          <h1>Search</h1>
          <Search />
          <HeaderCart onOpen={props.onOpen}/>
        </header>
    </>
  )
}

export default Header