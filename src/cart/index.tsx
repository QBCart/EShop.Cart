import React, { FC, useState, useEffect, createContext } from 'react';

import CartViewModal from './cart-view-modal';
import AddToCartModal from './add-to-cart-modal';
import ClearCartModal from './clear-cart-modal';
import ClearItemModal from './clear-item-modal';

import CartState from "./CartState";
import CartItem from "./CartItem";
import ICartContext from './CartContext';

interface Props {};

export const CartContext = createContext(null);

const Cart: FC<Props> = (props) => {

    const [cart, setCart] = useState<CartState>({ items: {} });

    useEffect(() => {
        pullFromLocalStorage();
    }, []);

    // useEffect(() => {

    //     $('#productPageAddToCart').on('click', function (e) {
    //         const triggerItem: CartItem = $(e.relatedTarget).data('item');
    //         triggerItem.Quantity = $('#productPageQuantity').val() as number;
    //         addToCart(triggerItem);
    //     });
        
    // }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(cart.items));
    }, [cart]);
    
    const pullFromLocalStorage = () => {

        if (localStorage.items) {
            let newCart = { ...cart };
            newCart.items = JSON.parse(localStorage.getItem('items'));
            setCart(prevCart => prevCart = newCart);
        };

    };

    const addToCart = (item: CartItem) => {

        let newCart = { ...cart };

        if (newCart.items[item.id]) {
            newCart.items[item.id].Quantity += item.Quantity;
        } else {
            newCart.items[item.id] = item;
        };
        setCart(newCart);
    };

    const updateLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(cart.items));
    };

    const changeItemQuantity = (e) => {
        if (e.target.value && parseInt(e.target.value) > 0) {
            let newCart = {...cart};
            newCart.items[e.target.dataset.id].Quantity = parseInt(e.target.value);
            setCart(newCart);
        };
    };

    const clearItem = (item: CartItem) => {
        let newCart = { ...cart };
        delete newCart.items[item.id];
        setCart(newCart);
    };

    const clearCart = () => {
        const newCart: CartState = { items: {} };
        setCart(newCart);
    };

    const cartContext: ICartContext = {
        cartState: cart,
        pullFromLocalStorage: pullFromLocalStorage,
        addToCart: addToCart,
        changeItemQuantity: changeItemQuantity,
        clearItem: clearItem,
        clearCart: clearCart        
    };

    return (
        <div>
            <CartContext.Provider value={cartContext}>
                <CartViewModal />
                <AddToCartModal />
                <ClearCartModal />
                <ClearItemModal />
            </CartContext.Provider>
        </div>
    );
};

export default Cart;