import CartItems from './CartItems';

interface CartState {
  items: CartItems;
  lastUpdated: Date;
}

export default CartState;
