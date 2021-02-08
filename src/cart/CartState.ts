import CartItem from './CartItem';

interface CartItems {
  [key: string]: CartItem;
}

interface CartState {
  items: CartItems;
  companyStorageUrl: string;
}

export default CartState;
