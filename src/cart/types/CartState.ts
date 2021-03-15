import type CartItems from './CartItems';

interface CartState {
  items: CartItems;
  ignoreGuestCart: boolean;
}

export default CartState;
