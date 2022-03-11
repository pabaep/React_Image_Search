import React, { useState } from 'react'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
import QueryProvider from './store/QueryProvider';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  
  const openCartHandler = () => {
    setCartIsShown(true);
  };

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <QueryProvider>
      {cartIsShown && <Cart onClose={closeCartHandler}/>}
      <Header onOpen={openCartHandler}/>
    </QueryProvider>
  )
}

export default App