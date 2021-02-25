import React, {
  FC,
  useState,
  useEffect,
  MouseEvent
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import { ProductModal, ProductModalItem } from '@qbcart/eshop-product-modal';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import ClearItemModal from './components/clear-item-modal';

import CartState from './types/CartState';
import CartItem from './types/CartItem';

interface Props {
  userLoggedIn: boolean;
  imagesStorageUrl: string;
  cartGetAPI?: string;
}

const Cart: FC<Props> = (props) => {
  const initCartFromLocalStorage = () => {
    if (props.userLoggedIn) {
      if (localStorage.userCart) {
        return JSON.parse(localStorage.userCart) as CartState;
      } else {
        return {
          items: {},
          lastUpdated: new Date(2000, 12, 25),
          ignoreGuestCart: false
        } as CartState;
      }
    } else if (localStorage.guestCart) {
      return JSON.parse(localStorage.guestCart) as CartState;
    } else {
      return {
        items: {},
        lastUpdated: new Date(2000, 12, 25),
        ignoreGuestCart: false
      } as CartState;
    }
  };

  const [cart, setCart] = useState<CartState>(initCartFromLocalStorage());

  useEffect(() => {
    getBackendCart();
  }, []);

  // Persist CartState
  useEffect(() => {
    console.log('updated local storage');
    if (props.userLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(cart));
      updateBackendCart();
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart.lastUpdated]);

  const getBackendCart = async () => {
    if (props.userLoggedIn) {
      const res = await fetch(`${props.cartGetAPI || '/cart/get'}`, {
        credentials: 'include',
        method: 'POST'
      });
      const json = await res.json();
      let x = localStorage.guestCart;
      let y = '';
    } else {
      console.log('logged out');
      localStorage.removeItem('userCart');
    }
  };

  const updateBackendCart = async () => {
    console.log('updated backend because user is logged in');
  };

  const pullFromLocalStorage = () => {
    if (props.userLoggedIn && localStorage.guestCart) {
      if (localStorage.userCart) {
        let newCart: CartState = JSON.parse(localStorage.userCart);

        if (newCart.ignoreGuestCart) {
          console.log('ignore guest cart: ' + newCart.ignoreGuestCart);
        } else {
          console.log('would you like to merge guest cart to yours?');
          newCart.ignoreGuestCart = true;
          console.log('ignore guest cart: ' + newCart.ignoreGuestCart);
        }

        setCart(newCart);
      }

      // just a demo for what will soon be append guest cart logic
    } else if (props.userLoggedIn && !localStorage.guestCart) {
      if (localStorage.userCart) {
        let newCart: CartState = JSON.parse(localStorage.userCart);
        setCart(newCart);
      }
    } else if (!props.userLoggedIn && localStorage.guestCart) {
      let newCart: CartState = JSON.parse(localStorage.guestCart);
      setCart(newCart);
    } else {
      return;
    }
  };

  const addToCart = (item: ProductModalItem) => {
    let newCart = { ...cart };

    if (newCart.items[item.id]) {
      newCart.items[item.id].quantity += item.quantity;
      newCart.items[item.id].inputValue = newCart.items[
        item.id
      ].quantity.toString();
      newCart.items[item.id].updateReady = false;
    } else {
      newCart.items[item.id] = {
        id: item.id,
        name: item.name,
        salesDesc: item.salesDesc,
        salesPrice: item.salesPrice,
        href: item.href,
        quantity: item.quantity,
        inputValue: item.quantity.toString(),
        updateReady: false
      };
    }

    newCart.lastUpdated = new Date();
    setCart(newCart);
  };

  const changeItemInputValue = (e: React.ChangeEvent<Element>) => {
    // @ts-ignore
    const evtId = e.target.dataset.id;
    let newCart = { ...cart };
    // @ts-ignore
    newCart.items[evtId].inputValue = e.target.value;
    const inputValueNum = Number(newCart.items[evtId].inputValue);
    if (
      typeof inputValueNum === 'number' &&
      inputValueNum > 0 &&
      inputValueNum % 1 === 0 &&
      inputValueNum !== newCart.items[evtId].quantity
    ) {
      newCart.items[evtId].updateReady = true;
    } else {
      newCart.items[evtId].updateReady = false;
    }
    setCart(newCart);
  };

  const revertItemInputValue = (e: React.ChangeEvent<Element>) => {
    // @ts-ignore
    const evtId = e.target.dataset.id;
    if (cart.items[evtId].updateReady) {
      let newCart = { ...cart };
      newCart.items[evtId].inputValue = newCart.items[
        evtId
      ].quantity.toString();
      newCart.items[evtId].updateReady = false;
      setCart(newCart);
    }
  };

  const changeItemQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const id = button.dataset.id!;
    let newCart = { ...cart };
    newCart.items[id].quantity = parseInt(
      (document.getElementById(`qty-input-${id}`) as HTMLInputElement).value
    );
    newCart.lastUpdated = new Date();
    setCart(newCart);
  };

  const clearItem = (item: CartItem) => {
    let newCart = { ...cart };
    delete newCart.items[item.id];
    newCart.lastUpdated = new Date();
    setCart(newCart);
  };

  const clearCart = () => {
    const newCart: CartState = {
      items: {},
      lastUpdated: new Date(),
      ignoreGuestCart: cart.ignoreGuestCart
    };
    setCart(newCart);
  };

  return (
    <div>
      <CartViewModal
        imagesStorageUrl={props.imagesStorageUrl}
        cartState={cart}
        pullFromLocalStorage={pullFromLocalStorage}
        changeItemQuantity={changeItemQuantity}
        changeItemInputValue={changeItemInputValue}
        revertItemInputValue={revertItemInputValue}
      />
      <ProductModal
        addToCart={addToCart}
        imagesStorageUrl={props.imagesStorageUrl}
      />
      <ClearCartModal clearCart={clearCart} />
      <ClearItemModal
        clearItem={clearItem}
        imagesStorageUrl={props.imagesStorageUrl}
      />
    </div>
  );
};

export default Cart;
