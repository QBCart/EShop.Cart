import React, { FC, useEffect, useState, useContext } from 'react';

import { CartContext } from './index';

import ICartContext from './CartContext';
import CartItem from './CartItem';

interface Props { };

const ClearItemModal: FC<Props> = (props) => {
    const cartContext = useContext<ICartContext>(CartContext);

    const [item, setItem] = useState<CartItem>(null);

    useEffect(() => {

        $('#ClearItemModal').on('shown.bs.modal', function (e) {
            //@ts-ignore
            const triggerItem: CartItem = $(e.relatedTarget).data('item');
            setItem(triggerItem);
        });

    }, []);

    return (
        <div className="modal fade" id="ClearItemModal" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                {
                    item
                        ?
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="close" data-toggle="modal" data-target="#ClearItemModal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src={"https://qbcstoragemns4oocsxwl6w.z13.web.core.windows.net/images/thumbnail/" + item.id} alt="" />
                                <span>Are you sure you want to clear {item.Name} from your cart?</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#ClearItemModal">No</button>
                                <button onClick={() => cartContext.clearItem(item)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#ClearItemModal">Yes</button>
                            </div>
                        </div>
                        :
                        <div className="modal-content"></div>
                }
            </div>
        </div>
    );
};

export default ClearItemModal;