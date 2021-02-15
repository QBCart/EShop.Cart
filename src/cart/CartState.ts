import CartItem from './CartItem';

interface CartItems {
  [key: string]: CartItem;
}

interface CartState {
  items: CartItems;
  companyStorageUrl: string;
  userId: string;
}

export default CartState;
