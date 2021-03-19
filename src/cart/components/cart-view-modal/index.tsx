import { React } from '../../../skypack';
import type { FC } from '../../../skypack';
import { toUSCurrency } from '@qbcart/utils';
import type CartItem from '@qbcart/types/eshop/cart-item';
import CartLineItem from './cart-line-item';

interface Props {
  imagesStorageUrl: string;
  cartItems: CartItem[];
  updateItem: (id: string, quantity: number) => Promise<string>;
  removeItem: (id: string) => Promise<string>;
  namespaceId: string;
}

const CartViewModal: FC<Props> = (props: Props) => {
  const modalId = `${props.namespaceId}-view-modal`;

  const cartTotals = {
    subtotal: 0,
    numOfItems: 0
  };

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
            {props.cartItems
              ? props.cartItems.map((item) => (
                  <CartLineItem
                    key={item.id}
                    id={item.id}
                    quantity={item.quantity}
                    imagesStorageUrl={props.imagesStorageUrl}
                    updateItem={props.updateItem}
                    removeItem={props.removeItem}
                    cartTotals={cartTotals}
                  />
                ))
              : null}
          </div>
          <div className="modal-footer">
            <h4 className="col  d-flex justify-content-start">
              Subtotal: {toUSCurrency(cartTotals.subtotal)} (
              {cartTotals.numOfItems} item
              {cartTotals.numOfItems === 1 ? '' : 's'})
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
        </div>
      </div>
    </div>
  );
};

export default CartViewModal;
