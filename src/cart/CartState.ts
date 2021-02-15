import CartItem from './CartItem';

interface CartItems {
  [key: string]: CartItem;
}

interface CartState {
  items: CartItems;
  lastUpdated: Date;
}

export default CartState;
