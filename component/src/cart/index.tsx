import React, {
  FC,
  useState,
  useEffect,
  useCallback
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import ProductModal from '@qbcart/eshop-product-modal';
import type ProductModalItem from '@qbcart/eshop-product-modal/types/product-modal-item';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import ClearItemModal from './components/clear-item-modal';
import Toast from './components/toast';

import type CartState from './types/CartState';

interface Props {
  userLoggedIn: boolean;
  imagesStorageUrl: string;
  cartAPI?: string;
}

const Cart: FC<Props> = (props) => {
  const initCartState = (ignoreGuestCart?: boolean) => {
    return {
      items: {},
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
    } else {
      localStorage.removeItem('userCart');
      if (localStorage.guestCart) {
        return JSON.parse(localStorage.guestCart) as CartState;
      } else {
        return initCartState(true);
      }
    }
  };

  const [cart, setCart] = useState<CartState>(initCartFromLocalStorage());
  const [lastPulledFromLocalStorage, setLastPulledFromLocalStorage] = useState(
    0
  );
  const [toastBody] = useState(React.createRef<HTMLDivElement>());
  const [startTime] = useState(Date.now());

  useEffect(() => {
    validateCart();
  }, []);

  // useEffect(() => {
  //   updateLocalStorage(cart);
  // }, [cart]);

  useEffect(() => {
    showToast();
  }, [cart]);

  const showToast = (message?: string) => {
    if (message) {
      toastBody.current!.textContent = message;
    }
    if (toastBody.current!.textContent) {
      $('#qbc-eshop-cart-toast').toast('show');
    }
  };

  const checkUptime = () => {
    const currentTime = Date.now();
    const twoHoursAsMilliseconds = 7200000;
    // const twoHoursAsMilliseconds = 20000;
    if (currentTime - startTime > twoHoursAsMilliseconds) {
      // TODO Creat modal to prompt the user to update
      showToast(
        'This tab has been open for more than 2 hours. You may want to refresh your page'
      );
    }
  };

  async function validateCart() {
    if (props.userLoggedIn || Object.keys(cart.items).length > 0) {
      let retry = 3;
      while (retry--) {
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
              body: JSON.stringify(cart.items)
            }
          );
          if (res.ok) {
            const results = await res.json();
            if (results.removedItems.length > 0) {
              // TODO: create & populate removed items modal
            }
            setCart({
              items: results.items,
              ignoreGuestCart: cart.ignoreGuestCart
            });
            break;
          } else {
            if (!retry) {
              showToast(await res.text());
            }
          }
        } catch (error) {
          showToast(
            `Our systems are having trouble validating your cart online. Please contact support.`
          );
          break;
        }
      }
    }
  }

  const getBackendCart = async () => {
    try {
      const res = await fetch(
        `${props.cartAPI ? props.cartAPI + '/get' : '/cart/get'}`,
        {
          credentials: 'include',
          method: 'POST'
        }
      );
      if (res.ok) {
        return {
          items: await res.json(),
          ignoreGuestCart: cart.ignoreGuestCart
        } as CartState;
      } else {
        switch (res.status) {
          case 401:
            throw await res.text();
          case 500:
            throw await res.text();
          case 404:
          default:
            // no cart yet
            return { ...cart };
        }
      }
    } catch (error) {
      throw "You're probably offline. Check your network.";
    }
  };

  const setCartFromLocalStorage = () => {
    console.log('setcartfromlocalstorage');
    if (localStorage.lastUpdated) {
      let newCart: CartState | null = null;
      setLastPulledFromLocalStorage((timeStamp) => {
        console.log('setlastpulledfromlocalstorage');
        const lastUpdated = Number(localStorage.lastUpdated);
        console.log(timeStamp);
        if (timeStamp !== lastUpdated) {
          if (props.userLoggedIn && localStorage.userCart) {
            newCart = JSON.parse(localStorage.userCart) as CartState;
          } else if (!props.userLoggedIn && localStorage.guestCart) {
            newCart = JSON.parse(localStorage.guestCart) as CartState;
          }
          console.log('updated');
          return lastUpdated;
        } else return timeStamp;
      });
      if (newCart) {
        setCart(newCart);
      }
    }
  };

  const updateLocalStorage = (cart: CartState) => {
    const lastUpdated = Date.now();
    localStorage.setItem('lastUpdated', lastUpdated.toString());
    setLastPulledFromLocalStorage(lastUpdated);

    if (props.userLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(cart));
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  };

  //! await an update from backend before allowing state update
  const addToCart = async (item: ProductModalItem) => {
    const newCart = { ...cart };

    if (newCart.items[item.id]) {
      newCart.items[item.id].quantity += item.quantity;
      newCart.items[item.id].lastUpdated = Date.now();
    } else {
      newCart.items[item.id] = {
        id: item.id,
        name: item.name,
        salesDesc: item.salesDesc,
        salesPrice: item.salesPrice,
        href: item.href,
        quantity: item.quantity,
        lastUpdated: Date.now()
      };
    }

    toastBody.current!.textContent = `Item ${item.name} was added to the cart.`;
    toastBody.current!.classList.add('text-success');
    setCart(newCart);
    updateLocalStorage(newCart);

    if (props.userLoggedIn) {
      addToBackendCart(
        item.id,
        newCart.items[item.id].quantity,
        newCart.items[item.id].lastUpdated
      );
    }
  };

  const addToBackendCart = async (
    id: string,
    quantity: number,
    lastUpdated: number
  ) => {
    try {
    } catch (error) {
      // TODO: Set toast message with error and show
      return false;
    }
  };

  const changeItemQuantity = (id: string) => {
    const newCart = { ...cart };
    newCart.items[id].quantity = parseInt(
      (document.getElementById(`qty-input-${id}`) as HTMLInputElement).value
    );
    newCart.items[id].lastUpdated = Date.now();
    setCart(newCart);
    if (props.userLoggedIn) {
      changeBackendItemQuantity(
        id,
        newCart.items[id].quantity,
        newCart.items[id].lastUpdated
      );
    }
  };

  const changeBackendItemQuantity = async (
    id: string,
    quantity: number,
    lastUpdated: number
  ) => {
    try {
    } catch (error) {
      // TODO: Set toast message with error and show
      return false;
    }
  };

  const clearItem = (id: string) => {
    const newCart = { ...cart };
    newCart.items[id].quantity = 0;
    newCart.items[id].lastUpdated = Date.now();
    setCart(newCart);

    if (props.userLoggedIn) {
      clearBackendItem(id, newCart.items[id].lastUpdated);
    }
  };

  const clearBackendItem = async (id: string, lastUpdated: number) => {};

  const clearCart = () => {
    const lastUpdated = Date.now();
    const newCart = { ...cart };

    for (let id in newCart.items) {
      newCart.items[id].quantity = 0;
      newCart.items[id].lastUpdated = lastUpdated;
    }
    setCart(newCart);

    if (props.userLoggedIn) {
      clearBackendCart(lastUpdated);
    }
  };

  const clearBackendCart = async (lastUpdated: number) => {};

  return (
    <div>
      <Toast imagesStorageUrl={props.imagesStorageUrl!} ref={toastBody} />
      <CartViewModal
        imagesStorageUrl={props.imagesStorageUrl}
        cartState={cart}
        setCartFromLocalStorage={setCartFromLocalStorage}
        changeItemQuantity={changeItemQuantity}
        checkUptime={checkUptime}
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
