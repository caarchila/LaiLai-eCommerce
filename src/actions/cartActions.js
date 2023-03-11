
export function addToCart(item) {
  return {
      type: 'ADD',
      item: item
  };
}

export function removeFromCart(item) {
  return {
      type: 'REMOVE',
      item: item
  };
}
export function updateFromCart(item) {
  return {
      type: 'UPDATE_CART',
      item: item
  };
}

export function clearCart(item){
  return {
    type:"CLEAR_CART",
    item:item
  }
}
