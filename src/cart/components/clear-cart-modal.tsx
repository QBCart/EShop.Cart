import * as React from '../../skypack';
import type { FC } from '../../skypack';

interface Props {
  clearCart(): void;
}

const ClearCartModal: FC<Props> = (props) => {
  const modalId = 'qbc-eshop-cart-clear-cart-modal';
  return (
    <div
      className="modal fade"
      id={modalId}
      data-backdrop="static"
      data-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
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
              onClick={props.clearCart}
              type="button"
              className="btn btn-danger"
              data-toggle="modal"
              data-target={`#${modalId}`}
            >
              Yes, Clear My Cart
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target={`#${modalId}`}
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
