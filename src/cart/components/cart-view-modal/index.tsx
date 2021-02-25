import React, {
  FC,
  useEffect,
  ChangeEvent
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';

import { toUSCurrency } from '@qbcart/utils';
import CartState from '../../types/CartState';
import QuantityInput from './quantity-input';

interface Props {
  imagesStorageUrl: string;
  cartState: CartState;
  pullFromLocalStorage(): void;
  changeItemQuantity(e: any): void;
  changeItemInputValue(e: ChangeEvent): void;
  revertItemInputValue(e: ChangeEvent): void;
}

const CartViewModal: FC<Props> = (props) => {
  const modalId = 'qbc-eshop-cart-view-modal';

  useEffect(() => {
    $(`#${modalId}`).on('shown.bs.modal', function () {
      props.pullFromLocalStorage();
    });
  }, []);

  let cartSubtotal = 0;
  let cartItemsTotal = 0;
  for (let itemId in props.cartState.items) {
    cartSubtotal +=
      props.cartState.items[itemId].salesPrice *
      props.cartState.items[itemId].quantity;
    
      cartItemsTotal +=
      props.cartState.items[itemId].quantity;
  }

  const renderItems = () => {
    let itemsArr: JSX.Element[] = [];
    for (let itemId in props.cartState.items) {
      itemsArr.push(
        <div key={props.cartState.items[itemId].id}>
          <div className="row cart-row">
            <div className="col-lg-4">
              <img
                className="img-fluid cart-row-img"
                src={props.imagesStorageUrl + 'images/thumbnail/' + itemId}
                alt=""
              />
            </div>
            <div className="col-lg-8 cart-row-data">
              <h4>{props.cartState.items[itemId].salesDesc}</h4>
              <div>
                Price: {toUSCurrency(props.cartState.items[itemId].salesPrice)}
              </div>
              <QuantityInput
                itemId={itemId}
                quantity={props.cartState.items[itemId].quantity}
                changeItemQuantity={props.changeItemQuantity}
              />
              <div>
                Total:{' '}
                {toUSCurrency(
                  props.cartState.items[itemId].salesPrice *
                    props.cartState.items[itemId].quantity
                )} ({props.cartState.items[itemId].quantity} item{props.cartState.items[itemId].quantity > 1 ? 's' : ''})
              </div>
              <div className="d-flex justify-content-end">
                <a href={props.cartState.items[itemId].href}>
                  <button type="button" className="btn btn-primary mr-1">
                    <span className="material-icons">open_in_new</span>
                  </button>
                </a>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#qbc-eshop-cart-clear-item-modal"
                  data-item={JSON.stringify(props.cartState.items[itemId])}
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return itemsArr;
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
            <div>{renderItems()}</div>
          </div>
          <div className="modal-footer">
            <h4 className="col  d-flex justify-content-start">
              Subtotal: {toUSCurrency(cartSubtotal)} ({cartItemsTotal} item{cartItemsTotal === 1 ? '' : 's'})
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
