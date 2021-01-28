import React, {
  FC,
  useEffect,
  useContext
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';

import { CartContext } from './index';

import toUSCurrency from './currency';

import ICartContext from './CartContext';

interface Props {
  modalId?: string;
}

const CartViewModal: FC<Props> = (props) => {
  const modalId: string = props?.modalId ?? 'cartViewModal';

  const cartContext = useContext<ICartContext>(CartContext);

  useEffect(() => {
    $(`#${modalId}`).on('shown.bs.modal', function () {
      cartContext.pullFromLocalStorage();
    });
  }, []);

  let cartSubtotal = 0;
  for (let itemId in cartContext.cartState.items) {
    cartSubtotal += cartContext.cartState.items[itemId].SalesPrice
  };

  const renderItems = () => {
    let itemsArr: JSX.Element[] = [];
    for (let itemId in cartContext.cartState.items) {
      itemsArr.push(
        <div key={cartContext.cartState.items[itemId].id}>
          <div className="row cart-row">
            <div className="col-lg-4">
              <img
                src={
                  'https://qbcstoragemns4oocsxwl6w.z13.web.core.windows.net/images/thumbnail/' +
                  itemId
                }
                alt=""
              />
            </div>
            <div className="col-lg-8">
              <h4>{cartContext.cartState.items[itemId].SalesDesc}</h4>
              <div>
                Price:{' '}
                {toUSCurrency(cartContext.cartState.items[itemId].SalesPrice)}
              </div>
              <div>
                <label>Quantity: </label>
                <input
                  onChange={cartContext.changeItemQuantity}
                  data-id={itemId}
                  type="number"
                  min="1"
                  value={cartContext.cartState.items[itemId].Quantity}
                  className="quantity-input form-control-sm ml-2 mr-1"
                ></input>
              </div>
              <div>
                Total:{' '}
                {toUSCurrency(
                  cartContext.cartState.items[itemId].SalesPrice *
                    cartContext.cartState.items[itemId].Quantity
                )}
              </div>
              <div className="d-flex justify-content-end">
                <a href={cartContext.cartState.items[itemId].Href}>
                  <button type="button" className="btn btn-secondary mr-1">
                    <span className="material-icons">find_in_page</span>
                  </button>
                </a>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#ClearItemModal"
                  data-item={JSON.stringify(
                    cartContext.cartState.items[itemId]
                  )}
                >
                  <span className="material-icons">remove_circle_outline</span>
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
            <h5 className="modal-title">Cart</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" id="cart-body">
            <div>
              {renderItems()}
            </div>
          </div>
          <div className="modal-footer">
            <div className="col  d-flex justify-content-start">
              Subtotal: {toUSCurrency(cartSubtotal)}
            </div>
            <div className="col d-flex justify-content-end">
              <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#ClearCartModal"
                >
                  Clear Cart
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartViewModal;
