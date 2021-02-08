import React, {
  FC,
  useState,
  useEffect,
  createContext
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import ProductModal from '@qbcart/qbc-eshop-product-modal';

import CartViewModal from './cart-view-modal';
import ClearCartModal from './clear-cart-modal';
import ClearItemModal from './clear-item-modal';

import CartState from './CartState';
import CartItem from './CartItem';
import ICartContext from './CartContext';

interface Props {
  addToCartModalId?: string;
  cartViewModalId?: string;
}

export const CartContext = createContext(null);

const Cart: FC<Props> = (props) => {
  const [cart, setCart] = useState<CartState>({
    items: {},
    companyStorageUrl: document.getElementById('cart').dataset.url
  });

  useEffect(() => {
    pullFromLocalStorage();
  }, []);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if(document.getElementById('user-is-logged-in')) {
  //     let userInfo = document.getElementById('user-is-logged-in').data
  //   };
  // }, []);

  // useEffect(() => {

  //     $('#productPageAddToCart').on('click', function (e) {
  //         const triggerItem: CartItem = $(e.relatedTarget).data('item');
  //         triggerItem.Quantity = $('#productPageQuantity').val() as number;
  //         addToCart(triggerItem);
  //     });

  // }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(cart.items));
  }, [cart]);

  const pullFromLocalStorage = () => {
    if (localStorage.items) {
      let newCart = { ...cart };
      newCart.items = JSON.parse(localStorage.getItem('items'));
      setCart((prevCart) => (prevCart = newCart));
    }
  };

  const addToCart = (item) => {
    let newCart = { ...cart };

    if (newCart.items[item.id]) {
      newCart.items[item.id].Quantity += item.Quantity;
    } else {
      newCart.items[item.id] = item;
    }
    newCart.items[item.id].inputValue = newCart.items[
      item.id
    ].Quantity.toString();
    newCart.items[item.id].updateReady = false;
    setCart(newCart);
  };

  const updateLocalStorage = () => {
    localStorage.setItem('items', JSON.stringify(cart.items));
  };

  const changeItemInputValue = (e) => {
    const evtId = e.target.dataset.id;
    let newCart = { ...cart };
    newCart.items[evtId].inputValue = e.target.value;
    const inputValueNum = Number(newCart.items[evtId].inputValue);
    if (
      typeof inputValueNum === 'number' &&
      inputValueNum > 0 &&
      inputValueNum % 1 === 0 &&
      inputValueNum !== newCart.items[evtId].Quantity
    ) {
      newCart.items[evtId].updateReady = true;
    } else {
      newCart.items[evtId].updateReady = false;
    }
    setCart(newCart);
  };

  const revertItemInputValue = (e) => {
    const evtId = e.target.dataset.id;
    if (!cart.items[evtId].updateReady) {
      let newCart = { ...cart };
      newCart.items[evtId].inputValue = newCart.items[
        evtId
      ].Quantity.toString();
      newCart.items[evtId].updateReady = false;
      setCart(newCart);
    }
  };

  const changeItemQuantity = (e) => {
    const evtId = e.target.dataset.id;
    let newCart = { ...cart };
    newCart.items[evtId].Quantity = parseInt(newCart.items[evtId].inputValue);
    newCart.items[evtId].updateReady = false;
    setCart(newCart);
  };

  const clearItem = (item: CartItem) => {
    let newCart = { ...cart };
    delete newCart.items[item.id];
    setCart(newCart);
  };

  const clearCart = () => {
    const newCart: CartState = {
      items: {},
      companyStorageUrl: document.getElementById('cart').dataset.url
    };
    setCart(newCart);
  };

  const cartContext: ICartContext = {
    cartState: cart,
    pullFromLocalStorage: pullFromLocalStorage,
    addToCart: addToCart,
    changeItemQuantity: changeItemQuantity,
    changeItemInputValue: changeItemInputValue,
    revertItemInputValue: revertItemInputValue,
    clearItem: clearItem,
    clearCart: clearCart
  };

  return (
    <div>
      <CartContext.Provider value={cartContext}>
        <CartViewModal
          modalId={props.cartViewModalId}
          companyStorageUrl={cart.companyStorageUrl}
        />
        <ProductModal
          triggerId={props.addToCartModalId}
          addToCart={addToCart}
          companyStorageUrl={cart.companyStorageUrl}
        />
        <ClearCartModal />
        <ClearItemModal companyStorageUrl={cart.companyStorageUrl} />
      </CartContext.Provider>
    </div>
  );
};

export default Cart;
