interface CartItem {
  id: string;
  salesDesc: string;
  name: string;
  salesPrice: number;
  href: string;
  quantity: number;
  inputValue: string;
  updateReady: boolean;
}

export default CartItem;
