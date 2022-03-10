import React, { useState } from 'react'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  
  const openCartHandler = () => {
    setCartIsShown(true);
  };

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>  
    {cartIsShown && <Cart onClose={closeCartHandler}/>}
      <Header onOpen={openCartHandler}/>
    </>
  )
}

export default App