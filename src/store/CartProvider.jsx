import React, { useState } from 'react'
import CartContext from './CartContext'

const CartProvider = (props) => {
  const [cartState, setCartState] = useState({
    // items: [{id: 'book1', name: 'THE OLD MAN AND SEA', price: 15.23, amount: 5}],
    // totalAmount: 76.15
    items: [],
    totalAmount: 0
  });


  // cart에 book 데이터를 추가하는 메서드
  const addItemToCartHandler = (item) => {
    // console.log('addItemToCartHandler called!');
    // console.log(item);

    // 1. 기본으로 add할 경우,
    // 기존에 cart에 등록된 items에 방금 새로 전달된 item 추가.
    // const updatedItem = [
    //   ...cartState.items,
    //   item
    // ];
    // setCartState({items: updatedItem});

    // 2. Add를 1개씩 여러 번 추가하였을 때 cart에 각각 listing 되지 않고,
    // 중복된 수량으로 통합 연산되도록
    
    // 이미 동일한 id값의 book이 cart에 존재할 경우,
    // 해당 book의 amount만 추가.
    // console.log(item);

    const existingCartItemIndex = cartState.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    const exstingCartItem = cartState.items[existingCartItemIndex];
    
    let updatedItems;
    if(exstingCartItem) { // 방금 새로 등록한 book(item)이 cart에 이미 존재할 때.

      const updatedItem = {
        ...exstingCartItem,
        amount: exstingCartItem.amount + item.amount,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;

    } else { // 방금 새로 등록한 book(item)이 cart에 존재하지 않을 때.
      updatedItems = cartState.items.concat(item);
    }

    const updatedTotalAmount = cartState.totalAmount + item.price * item.amount;

    setCartState({items: updatedItems, totalAmount: updatedTotalAmount});
  };
    
  const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
  }

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
}

export default CartProvider