import React from "react";
import { render } from "react-dom";
import  Cart from './cart';

const mountCart = (cartViewModalId?: string, addToCartModalId?: string) => {
  render(<Cart addToCartModalId={addToCartModalId} cartViewModalId={cartViewModalId} />, document.getElementById('cart'));
};

export default mountCart;