import CartItems from './CartItems';

interface CartState {
  items: CartItems;
  lastUpdated: Date;
  ignoreGuestCart: boolean;
}

export default CartState;
