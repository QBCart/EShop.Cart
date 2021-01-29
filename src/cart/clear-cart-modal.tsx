import React, {
  FC,
  useEffect,
  useContext
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';

import { CartContext } from './index';

import ICartContext from './CartContext';
interface Props {}

const ClearCartModal: FC<Props> = (props) => {
  const cartContext = useContext<ICartContext>(CartContext);

  return (
    <div
      className="modal fade"
      id="ClearCartModal"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content clear-modal">
          <div className="modal-header clear-header d-flex justify-content-start">
              <h5 className="modal-title" id="staticBackdropLabel">
                <span className="material-icons m-icon-36">delete</span>
              </h5>
              <div className="clear-title">Empty Cart</div>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center">
              <span className="material-icons m-icon-36 mr-2">
                remove_shopping_cart
              </span>
              Are you sure you want to clear your entire cart?
              <span className="material-icons m-icon-36 ml-2">
                remove_shopping_cart
              </span>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              onClick={cartContext.clearCart}
              type="button"
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#ClearCartModal"
            >
              Yes, Clear My Cart
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#ClearCartModal"
            >
              No, Keep My Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearCartModal;
