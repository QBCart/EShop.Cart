import React, {
  FC,
  useState,
  useEffect
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import { ProductModal, ProductModalItem } from '@qbcart/eshop-product-modal';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import ClearItemModal from './components/clear-item-modal';

import CartState from './types/CartState';
import CartItem from './types/CartItem';

interface Props {
  cartGetAPI?: string;
}

const Cart: FC<Props> = (props) => {
  const cartNamespaceId = 'qbc-eshop-cart';
  const imagesStorageUrl = document.getElementById(cartNamespaceId)!.dataset
    .url!;

  const [cart, setCart] = useState<CartState>({
    items: {},
    lastUpdated: new Date(),
    ignoreGuestCart: false
  });

  const userLoggedIn = Boolean(
    document.getElementById(cartNamespaceId)!.dataset.userLoggedIn
  );

  useEffect(() => {
    getCart();
  }, []);

  // useEffect(() => {
  //   pullFromLocalStorage();
  // }, []);

  // useEffect(() => {
  //   if (userLoggedIn) {
  //     localStorage.setItem('userCart', JSON.stringify(cart));
  //   } else {
  //     localStorage.setItem('guestCart', JSON.stringify(cart));
  //   }
  // }, [cart]);

  const getCart = async () => {
    if (userLoggedIn) {
      const res = await fetch(`${props.cartGetAPI || '/cart/get'}`, {
        credentials: 'include',
        method: 'POST'
      });
      const json = await res.json();
      let x = '';
    } else {
      console.log('logged out');
      localStorage.removeItem('userCart');
    }
  };

  const pullFromLocalStorage = () => {
    if (userLoggedIn && localStorage.guestCart) {
      if (localStorage.userCart) {
        let newCart = { ...cart };
        newCart = JSON.parse(localStorage.getItem('userCart')!);

        if (newCart.ignoreGuestCart) {
          console.log('ignore guest cart: ' + newCart.ignoreGuestCart)
        } else {
          console.log('would you like to merge guest cart to yours?');
          newCart.ignoreGuestCart = true;
          console.log('ignore guest cart: ' + newCart.ignoreGuestCart)
        };

        setCart(newCart);
        updateLocalStorage(newCart);
      }

      // just a demo for what will soon be append guest cart logic

      

      
    } else if (userLoggedIn && !localStorage.guestCart) {
      if (localStorage.userCart) {
        let newCart = { ...cart };
        newCart = JSON.parse(localStorage.getItem('userCart')!);
        setCart(newCart);
      }
    } else if (!userLoggedIn && localStorage.guestCart) {
      let newCart = { ...cart };
      newCart = JSON.parse(localStorage.getItem('guestCart')!);
      setCart(newCart);
    } else {
      return;
    }
  };

  const updateLocalStorage = (cart: CartState) => {
    if (userLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(cart));
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
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
    updateLocalStorage(newCart);
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
    if (!cart.items[evtId].updateReady) {
      let newCart = { ...cart };
      newCart.items[evtId].inputValue = newCart.items[
        evtId
      ].quantity.toString();
      newCart.items[evtId].updateReady = false;
      setCart(newCart);
    }
  };

  const changeItemQuantity = (e: Event) => {
    // @ts-ignore
    const evtId = e.target.dataset.id;
    let newCart = { ...cart };
    newCart.items[evtId].quantity = parseInt(newCart.items[evtId].inputValue);
    newCart.items[evtId].updateReady = false;
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
    console.log(newCart);
    setCart(newCart);
  };

  // fetch url="/cart/get" or "/cart/update" (is a relative path)

  // useEffect(() => {
  //   if(document.getElementById('user-is-logged-in')) {
  //     let userInfo = document.getElementById('user-is-logged-in').data
  //   };
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(cart.items));
  // }, [cart]);

  // const pullFromLocalStorage = () => {
  //   if (localStorage.items) {
  //     let newCart = { ...cart };
  //     newCart.items = JSON.parse(localStorage.getItem('items')!);
  //     setCart((prevCart) => (prevCart = newCart));
  //   }
  // };

  // const updateLocalStorage = () => {
  //   localStorage.setItem('items', JSON.stringify(cart.items));
  // };

  // const updateLocalStorage = () => {
  //   if (!userLoggedIn) {
  //     localStorage.setItem('guestCartItems', JSON.stringify(cart.items));
  //   } else {
  //     localStorage.setItem('userCartItems', JSON.stringify(cart.items));
  //   }
  // };

  return (
    <div>
      <CartViewModal
        imagesStorageUrl={imagesStorageUrl}
        cartState={cart}
        pullFromLocalStorage={pullFromLocalStorage}
        changeItemQuantity={changeItemQuantity}
        changeItemInputValue={changeItemInputValue}
        revertItemInputValue={revertItemInputValue}
      />
      <ProductModal addToCart={addToCart} imagesStorageUrl={imagesStorageUrl} />
      <ClearCartModal clearCart={clearCart} />
      <ClearItemModal
        clearItem={clearItem}
        imagesStorageUrl={imagesStorageUrl}
      />
    </div>
  );
};

export default Cart;
