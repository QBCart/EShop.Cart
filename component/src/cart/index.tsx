import React, {
  FC,
  useState,
  useEffect
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import ProductModal from '@qbcart/eshop-product-modal';
import type ProductModalItem from '@qbcart/eshop-product-modal/types/product-modal-item';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import ClearItemModal from './components/clear-item-modal';

import type CartState from './types/CartState';

interface Props {
  userLoggedIn: boolean;
  imagesStorageUrl: string;
  cartAPI?: string;
}

const Cart: FC<Props> = (props) => {
  const initCartState = (
    useCurrentTime?: boolean,
    ignoreGuestCart?: boolean
  ) => {
    return {
      items: {},
      lastUpdated: useCurrentTime ?? false ? Date.now() : 0,
      ignoreGuestCart: ignoreGuestCart ?? false
    } as CartState;
  };

  const initCartFromLocalStorage = () => {
    if (props.userLoggedIn) {
      if (localStorage.userCart) {
        return JSON.parse(localStorage.userCart) as CartState;
      } else {
        return initCartState();
      }
    } else if (localStorage.guestCart) {
      return JSON.parse(localStorage.guestCart) as CartState;
    } else {
      return initCartState(true);
    }
  };

  const [cart, setCart] = useState<CartState>(initCartFromLocalStorage());

  useEffect(() => {
    console.log('effect: initUseEffects');
    initUseEffects();
  }, []);

  // Persist CartState
  useEffect(() => {
    if (props.userLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(cart));
      updateBackendCart();
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
    console.log('effect: local storage');
  }, [cart.lastUpdated]);

  const initUseEffects = async () => {
    await validateCart();
    await getBackendCart();
  };

  const validateCart = async () => {
    if (Object.keys(cart.items).length > 0) {
      try {
        const res = await fetch(
          `${props.cartAPI ? props.cartAPI + '/validate' : '/cart/validate'}`,
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(cart)
          }
        );
        if (res.ok) {
          const validatedCart: CartState = await res.json();
          validatedCart.lastUpdated = Date.now();
          setCart(validatedCart);
        } else {
          // TODO: Add network toast
          console.error(await res.text());
        }
      } catch (error) {
        // TODO: Add network toast
        console.error('error: ' + error);
      }
    }
    console.log('effect: validateCart');
  };

  const getBackendCart = async () => {
    if (props.userLoggedIn) {
      const res = await fetch(
        `${props.cartAPI ? props.cartAPI + '/get' : '/cart/get'}`,
        {
          credentials: 'include',
          method: 'POST'
        }
      );
      const json = await res.json();
      let x = localStorage.guestCart;
      let y = '';
    } else {
      localStorage.removeItem('userCart');
    }
    console.log('effect: getBackendCart');
  };

  const updateBackendCart = async () => {
    if (cart.lastUpdated > initCartState().lastUpdated) {
      try {
        const res = await fetch(
          `${props.cartAPI ? props.cartAPI + '/update' : '/cart/update'}`,
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
          }
        );
        if (!res.ok) {
          console.log('Internet may be having issues.');
        }
      } catch (err) {
        console.log(err);
      }
    }
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
    } else {
      newCart.items[item.id] = {
        id: item.id,
        name: item.name,
        salesDesc: item.salesDesc,
        salesPrice: item.salesPrice,
        href: item.href,
        quantity: item.quantity
      };
    }

    newCart.lastUpdated = Date.now();
    setCart(newCart);
  };

  const changeItemQuantity = (id: string) => {
    let newCart = { ...cart };
    newCart.items[id].quantity = parseInt(
      (document.getElementById(`qty-input-${id}`) as HTMLInputElement).value
    );
    newCart.lastUpdated = Date.now();
    setCart(newCart);
  };

  const clearItem = (id: string) => {
    let newCart = { ...cart };
    delete newCart.items[id];
    newCart.lastUpdated = Date.now();
    setCart(newCart);
  };

  const clearCart = () => {
    const newCart: CartState = initCartState(true, cart.ignoreGuestCart);
    setCart(newCart);
  };

  return (
    <div>
      <CartViewModal
        imagesStorageUrl={props.imagesStorageUrl}
        cartState={cart}
        pullFromLocalStorage={pullFromLocalStorage}
        changeItemQuantity={changeItemQuantity}
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
