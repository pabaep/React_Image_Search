import React, { useState } from 'react'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
import QueryProvider from './store/QueryProvider';
import ImageProvider from './store/ImageProvider';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  
  const openCartHandler = () => {
    setCartIsShown(true);
  };

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ImageProvider>
    <QueryProvider>
      <Header onOpen={openCartHandler}/>
      {cartIsShown && <Cart onClose={closeCartHandler}/>}
    </QueryProvider>
    </ImageProvider>
  )
}

export default App