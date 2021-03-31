import React, { FC } from 'react';
import { useCartItems } from '@qbcart/eshop-local-db';
import { toUSCurrency } from '@qbcart/utils';
import CartLineItem from './cart-line-item.js';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const CartViewModal: FC<Props> = (props: Props) => {
  const items = useCartItems(props.userLoggedIn);
  const modalId = `${props.namespaceId}-view-modal`;

  const subtotal =
    (items?.length ?? 0) > 0
      ? items
          .map((item) => item.price! * item.quantity!)
          .reduce((a, b) => a + b)
      : 0;
  const numOfItems =
    (items?.length ?? 0) > 0
      ? items.map((item) => item.quantity!).reduce((a, b) => a + b)
      : 0;

  return (
    <div className="modal" tabIndex={-1} id={modalId}>
      <div className="modal-dialog modal-dialog-scrollable modal-xl modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <span className="material-icons m-icon-36">shopping_cart</span>
            </div>
            <div className="cart-title">Shopping Cart</div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {(items?.length ?? 0) > 0 ? (
              items.map((item) => (
                <CartLineItem
                  key={item.id}
                  id={item.id!}
                  quantity={item.quantity!}
                  imagesStorageUrl={props.imagesStorageUrl}
                  userLoggedIn={props.userLoggedIn}
                />
              ))
            ) : (
              <h5 className="text-warning">Your cart is currently empty.</h5>
            )}
          </div>
          {(items?.length ?? 0) > 0 ? (
            <div className="modal-footer">
              <h4 className="col  d-flex justify-content-start">
                Subtotal: {toUSCurrency(subtotal)} ({numOfItems} item
                {numOfItems === 1 ? '' : 's'})
              </h4>
              <div className="col d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#qbc-eshop-cart-clear-cart-modal"
                >
                  <span className="material-icons">delete</span>
                </button>
                <a href="/Checkout">
                  <button type="button" className="btn btn-success ml-2 mr-2">
                    <span className="material-icons">payment</span>
                  </button>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartViewModal;
