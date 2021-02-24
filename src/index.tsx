import React from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import { render } from 'https://cdn.skypack.dev/pin/react-dom@v17.0.1-DtIXT56q6U8PbgLMrBhE/min/react-dom.js';
import Cart from './cart';

const mountCart = (userLoggedIn: boolean, cartGetAPI?: string) => {
  render(
    <Cart cartGetAPI={cartGetAPI} userLoggedIn={userLoggedIn} />,
    document.getElementById('qbc-eshop-cart')
  );
};

export default mountCart;
