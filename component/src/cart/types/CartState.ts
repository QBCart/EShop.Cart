import type CartItems from './CartItems';

interface CartState {
  items: CartItems;
  lastUpdated: number;
  ignoreGuestCart: boolean;
}

export default CartState;
