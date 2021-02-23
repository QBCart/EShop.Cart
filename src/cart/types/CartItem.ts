interface CartItem {
  id: string;
  name: string;
  salesDesc: string;
  salesPrice: number;
  href: string;
  quantity: number;
  inputValue: string;
  updateReady: boolean;
}

export default CartItem;
