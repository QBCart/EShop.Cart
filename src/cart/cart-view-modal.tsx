import React, { FC, useEffect, useContext } from 'react';

import { CartContext } from './index';

import toUSCurrency from './currency';

import ICartContext from './CartContext';

interface Props { };

const CartViewModal: FC<Props> = (props) => {

    const cartContext = useContext<ICartContext>(CartContext);

    useEffect(() => {

        $('#cartViewModal').on('shown.bs.modal', function () {
            cartContext.pullFromLocalStorage();
        });

    }, []);

    const renderItems = () => {
        let itemsArr: JSX.Element[] = [];
        for (let itemId in cartContext.cartState.items) {
            itemsArr.push(
                <div key={cartContext.cartState.items[itemId].id}>
                    <img src={"https://qbcstoragemns4oocsxwl6w.z13.web.core.windows.net/images/thumbnail/" + itemId} alt="" />
                    <div>
                        <span>Name: {cartContext.cartState.items[itemId].Name}  -  </span>
                        <span>Id: {itemId}  -  </span>
                        <span>Quantity: {cartContext.cartState.items[itemId].Quantity}  -  </span>
                        <span>Price: {toUSCurrency(cartContext.cartState.items[itemId].SalesPrice * cartContext.cartState.items[itemId].Quantity)}</span>
                        <br />
                        <label>Change Quantity: </label>
                        <input onChange={cartContext.changeItemQuantity} data-id={itemId} type="number" min="1" value={cartContext.cartState.items[itemId].Quantity}></input>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ClearItemModal" data-item={JSON.stringify(cartContext.cartState.items[itemId])}>Clear Item</button>
                    </div>
                </div>
            );
        };
        return itemsArr;
    };

    return (
        <div className="modal" tabIndex={-1} id="cartViewModal">
            <div className="modal-dialog modal-xl modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cart</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            {renderItems()}
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ClearCartModal">Clear Cart</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartViewModal;