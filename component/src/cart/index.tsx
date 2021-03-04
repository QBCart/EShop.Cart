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
import Toast from './components/toast';

import type CartState from './types/CartState';
import type { EShopCart } from '@qbcart/types/eshop';

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
  const [lastPulledFromLocalStorage, setLastPulledFromLocalStorage] = useState(0);
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

  const validateCart = async () => {
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
  };

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

  const pullFromLocalStorage = () => {
    const lastTimeUpdated: number = Number(localStorage.lastTimeUpdated)
    if ( lastTimeUpdated !== lastPulledFromLocalStorage) {
      if (props.userLoggedIn && localStorage.guestCart) {
        if (localStorage.userCart) {
          let newCart: CartState = JSON.parse(localStorage.userCart);

          if (newCart.ignoreGuestCart) {
            // console.log('ignore guest cart: ' + newCart.ignoreGuestCart);
          } else {
            // console.log('would you like to merge guest cart to yours?');
            // newCart.ignoreGuestCart = true;
            // console.log('ignore guest cart: ' + newCart.ignoreGuestCart);
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

      setLastPulledFromLocalStorage(lastTimeUpdated)
      console.log('pulled from local storage')
    }
  };

  const updateLocalStorage = (cart: CartState) => {
    // localStorage.setItem('lastTimeUpdated', lastPulledFromLocalStorage.toString());
    localStorage.setItem('lastTimeUpdated', Date.now().toString());
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
      <div>{lastPulledFromLocalStorage}</div>
      <Toast imagesStorageUrl={props.imagesStorageUrl!} ref={toastBody} />
      <CartViewModal
        imagesStorageUrl={props.imagesStorageUrl}
        cartState={cart}
        pullFromLocalStorage={pullFromLocalStorage}
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
