import React, {
  FC,
  useEffect,
  useState
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';

import CartItem from './CartItem';

interface Props {
  companyStorageUrl: string;
  clearItem(item: CartItem): void;
}

const ClearItemModal: FC<Props> = (props) => {
  const [item, setItem] = useState<CartItem>();

  useEffect(() => {
    $('#ClearItemModal').on('shown.bs.modal', function (e) {
      //@ts-ignore
      const triggerItem: CartItem = $(e.relatedTarget).data('item');
      setItem(triggerItem);
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="ClearItemModal"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        {item ? (
          <div className="modal-content clear-modal">
            <div className="modal-header clear-header d-flex justify-content-start">
              <h5 className="modal-title" id="staticBackdropLabel">
                <span className="material-icons m-icon-36">delete</span>
              </h5>
              <div className="clear-title">Remove {item.SalesDesc}</div>
            </div>

            <div className="modal-body">
              <div>
                <img
                  className="clear-img"
                  src={props.companyStorageUrl + 'images/thumbnail/' + item.id}
                  alt=""
                />
              </div>
              <span>
                Are you sure you want to remove {item.SalesDesc} from your cart?
              </span>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={() => props.clearItem(item)}
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#ClearItemModal"
              >
                Yes, Remove This Item
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#ClearItemModal"
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
