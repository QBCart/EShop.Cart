import CartItems from './CartItems';

interface CartState {
  items: CartItems;
  lastUpdated: Date;
  ignoreGuestCart: Boolean;
}

export default CartState;
