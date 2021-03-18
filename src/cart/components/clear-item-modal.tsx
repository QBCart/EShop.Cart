import { React } from '../../skypack';
import { FC, useEffect, useState } from '../../skypack';

import type CartItem from '../types/CartItem';

interface Props {
  imagesStorageUrl: string;
  clearItem(id: string): void;
}

const ClearItemModal: FC<Props> = (props) => {
  const [item, setItem] = useState<CartItem>();
  const modalId = 'qbc-eshop-cart-clear-item-modal';

  useEffect(() => {
    $(`#${modalId}`).on('shown.bs.modal', function (e: JQueryEventObject) {
      const triggerItem: CartItem = $(e.relatedTarget).data('item');
      setItem(triggerItem);
    });
  }, []);

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
        {item ? (
          <div className="modal-content">
            <div className="modal-header clear-header d-flex justify-content-start">
              <h5 className="modal-title" id="staticBackdropLabel">
                <span className="material-icons m-icon-36">delete</span>
              </h5>
              <div className="clear-title">Remove Item</div>
            </div>

            <div className="modal-body">
              <div>
                <img
                  className="clear-img"
                  src={props.imagesStorageUrl + 'images/thumbnail/' + item.id}
                  alt=""
                />
              </div>
              <span>
                Are you sure you want to remove {item.salesDesc} from your cart?
              </span>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={() => props.clearItem(item.id)}
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target={`#${modalId}`}
              >
                Yes, Remove This Item
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target={`#${modalId}`}
              >
                No, Keep this Item
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-content"></div>
        )}
      </div>
    </div>
  );
};

export default ClearItemModal;
