import React, {
  FC,
  useState,
  useEffect
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
import ProductModal from '@qbcart/qbc-eshop-product-modal';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import ClearItemModal from './components/clear-item-modal';

import CartState from './types/CartState';
import CartItem from './types/CartItem';

interface Props {
  cartViewModalId?: string;
  cartGetAPI?: string;
}

const Cart: FC<Props> = (props) => {
  const cartNamespaceId = 'qbc-eshop-cart';
  const companyStorageUrl = document.getElementById(cartNamespaceId)!.dataset
    .url!;
  const [cart, setCart] = useState<CartState>({
    items: {},
    lastUpdated: new Date()
  });

  const userLoggedIn = Boolean(
    document.getElementById(cartNamespaceId)!.dataset.userLoggedIn
  );

  useEffect(() => {
    pullFromLocalStorage();
  }, []);

  // fetch url="/cart/get" or "/cart/update" (is a relative path)

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
      newCart.items = JSON.parse(localStorage.getItem('items')!);
      setCart((prevCart) => (prevCart = newCart));
    }
  };

  const addToCart = (item: CartItem) => {
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
    newCart.lastUpdated = new Date();
    console.log(newCart);
    setCart(newCart);
  };

  const updateLocalStorage = () => {
    localStorage.setItem('items', JSON.stringify(cart.items));
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
      inputValueNum !== newCart.items[evtId].Quantity
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
      ].Quantity.toString();
      newCart.items[evtId].updateReady = false;
      setCart(newCart);
    }
  };

  const changeItemQuantity = (e: Event) => {
    // @ts-ignore
    const evtId = e.target.dataset.id;
    let newCart = { ...cart };
    newCart.items[evtId].Quantity = parseInt(newCart.items[evtId].inputValue);
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
      lastUpdated: new Date()
    };
    console.log(newCart);
    setCart(newCart);
  };

  return (
    <div>
      <CartViewModal
        modalId={props.cartViewModalId}
        companyStorageUrl={companyStorageUrl}
        cartState={cart}
        pullFromLocalStorage={pullFromLocalStorage}
        changeItemQuantity={changeItemQuantity}
        changeItemInputValue={changeItemInputValue}
        revertItemInputValue={revertItemInputValue}
      />
      <ProductModal
        addToCart={addToCart}
        companyStorageUrl={companyStorageUrl}
      />
      <ClearCartModal clearCart={clearCart} />
      <ClearItemModal
        clearItem={clearItem}
        companyStorageUrl={companyStorageUrl}
      />
    </div>
  );
};

export default Cart;
