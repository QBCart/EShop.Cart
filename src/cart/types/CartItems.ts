import type CartItem from './CartItem';

export default interface CartItems {
  [key: string]: CartItem;
}
