import React, { FC, useEffect, useContext } from 'react';

import { CartContext } from './index';

import ICartContext from './CartContext';
interface Props { };

const ClearCartModal: FC<Props> = (props) => {
    const cartContext = useContext<ICartContext>(CartContext);

    return (
        <div className="modal fade" id="ClearCartModal" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="close" data-toggle="modal" data-target="#ClearCartModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to clear your entire cart?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#ClearCartModal">No</button>
                        <button onClick={cartContext.clearCart} type="button" className="btn btn-primary" data-toggle="modal" data-target="#ClearCartModal">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClearCartModal;