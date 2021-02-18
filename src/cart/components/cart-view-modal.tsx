import React, {
  FC,
  useEffect,
  ChangeEvent
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';

import toUSCurrency from '../utils/currency';
import CartState from '../types/CartState';

interface Props {
  modalId?: string;
  companyStorageUrl: string;
  cartState: CartState;
  pullFromLocalStorage(): void;
  changeItemQuantity(e: any): void;
  changeItemInputValue(e: ChangeEvent): void;
  revertItemInputValue(e: ChangeEvent): void;
}

const CartViewModal: FC<Props> = (props) => {
  const modalId: string = props?.modalId ?? 'cartViewModal';

  useEffect(() => {
    $(`#${modalId}`).on('shown.bs.modal', function () {
      props.pullFromLocalStorage();
    });
  }, []);

  let cartSubtotal = 0;
  for (let itemId in props.cartState.items) {
    cartSubtotal +=
      props.cartState.items[itemId].SalesPrice *
      props.cartState.items[itemId].Quantity;
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
                src={props.companyStorageUrl + 'images/thumbnail/' + itemId}
                alt=""
              />
            </div>
            <div className="col-lg-8 cart-row-data">
              <h4>{props.cartState.items[itemId].SalesDesc}</h4>
              <div>
                Price: {toUSCurrency(props.cartState.items[itemId].SalesPrice)}
              </div>
              <div>
                <label>Quantity: </label>
                <input
                  onChange={props.changeItemInputValue}
                  data-id={itemId}
                  onBlur={props.revertItemInputValue}
                  type="number"
                  min="1"
                  value={props.cartState.items[itemId].inputValue}
                  className="quantity-input-cart form-control-sm ml-2 mr-1"
                ></input>
                {props.cartState.items[itemId].updateReady ? (
                  <button
                    data-id={itemId}
                    className="btn btn-success cart-quantity-update"
                    onClick={props.changeItemQuantity}
                  >
                    update
                  </button>
                ) : null}
              </div>
              <div>
                Total:{' '}
                {toUSCurrency(
                  props.cartState.items[itemId].SalesPrice *
                    props.cartState.items[itemId].Quantity
                )}
              </div>
              <div className="d-flex justify-content-end">
                <a href={props.cartState.items[itemId].Href}>
                  <button type="button" className="btn btn-primary mr-1">
                    <span className="material-icons">open_in_new</span>
                  </button>
                </a>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#ClearItemModal"
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
          <div className="modal-header cart-header">
            <div className="modal-title">
              <span className="material-icons m-icon-36">shopping_cart</span>
            </div>
            <div className="cart-title">Shopping Cart</div>
            <button
              type="button"
              className="close cart-header-close"
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
              Subtotal: {toUSCurrency(cartSubtotal)}
            </h4>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#ClearCartModal"
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
