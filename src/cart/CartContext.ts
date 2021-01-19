import { ChangeEvent, ChangeEventHandler } from "react";
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