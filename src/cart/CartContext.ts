import { ChangeEvent } from "https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js";
import CartItem from "./CartItem";
import CartState from "./CartState";

interface ICartContext {
    cartState: CartState;
    pullFromLocalStorage(): void;
    changeItemQuantity(e: ChangeEvent): void; 
    clearItem(item: CartItem): void; 
    clearCart(): void;
    addToCart(item: CartItem): void 
};

export default ICartContext;