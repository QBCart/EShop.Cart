import React, { FC, useEffect } from 'react';
import { useInventoryItem, useRemoveFromCart } from '@qbcart/eshop-local-db';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const RemoveItemModal: FC<Props> = (props: Props) => {
  const removeFromCart = useRemoveFromCart(props.userLoggedIn);
  const [item, setItem] = useInventoryItem('');
  const modalId = `${props.namespaceId}-clear-item-modal`;

  useEffect(() => {
    $(`#${modalId}`).on('show.bs.modal', function (e: JQueryEventObject) {
      setItem($(e.relatedTarget).data('id'));
    });
  }, [modalId, setItem]);

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
                Are you sure you want to remove {item.SalesDesc} from your cart?
              </span>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={() => removeFromCart(item.id)}
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

export default RemoveItemModal;
