import { React } from '../../../skypack';
import { FC, useState, useEffect } from '../../../skypack';
import { toUSCurrency } from '@qbcart/utils';
import { useInventoryItem, useCustomPrice } from '@qbcart/eshop-local-db';

interface Props {
  id: string;
  quantity: number;
  imagesStorageUrl: string;
  updateItem: (id: string, quantity: number) => Promise<string>;
  removeItem: (id: string) => Promise<string>;
  cartTotals: { subtotal: number; numOfItems: number };
}

const CartLineItem: FC<Props> = (props: Props) => {
  const [inputQuantity, setInputQuantity] = useState(props.quantity.toString());
  const [updateReady, setUpdateReady] = useState(false);
  const [item] = useInventoryItem(props.id);
  const [customPrice] = useCustomPrice(props.id);
  const price = customPrice?.price ?? item?.SalesPrice ?? 0;

  props.cartTotals.subtotal += props.quantity * price;
  props.cartTotals.numOfItems += props.quantity;

  useEffect(() => {
    const inputValueNum = Number(inputQuantity);
    if (
      typeof inputValueNum === 'number' &&
      inputValueNum > 0 &&
      inputValueNum % 1 === 0 &&
      inputValueNum !== props.quantity
    ) {
      setUpdateReady(true);
    } else {
      setUpdateReady(false);
    }
  }, [inputQuantity]);

  const revertInputQuantity = () => {
    if (!updateReady) {
      setInputQuantity(props.quantity.toString());
    }
  };

  const updateItemQuantity = async () => {
    const error = await props.updateItem(props.id, Number(inputQuantity));
    if (error) {
      //invalid modal with message try again
    } else {
      setUpdateReady(false);
    }
  };

  return (
    <div className="row cart-row">
      <div className="col-lg-4">
        <img
          className="img-fluid cart-row-img"
          src={props.imagesStorageUrl + 'images/thumbnail/' + props.id}
        />
      </div>
      {item ? (
        <div className="col-lg-8 cart-row-data">
          <h4>{item.SalesDesc}</h4>
          <div className="mb-2 mt-3">
            Price: <b>{toUSCurrency(price)}</b>
          </div>
          <div className="mb-1">
            <label>Quantity: </label>
            <input
              onChange={(e) => setInputQuantity(e.target.value)}
              onBlur={revertInputQuantity}
              value={inputQuantity}
              type="number"
              min="1"
              className="quantity-input-cart form-control-sm ml-2 mr-1"
            ></input>
            {updateReady ? (
              <button
                className="btn btn-success cart-quantity-update"
                onClick={updateItemQuantity}
              >
                update
              </button>
            ) : null}
          </div>
          <div>
            Total:{' '}
            <b>
              {toUSCurrency(price * props.quantity)} ({props.quantity} item
              {props.quantity > 1 ? 's' : ''})
            </b>
          </div>
          <div className="d-flex justify-content-end">
            <a href={item.Href}>
              <button type="button" className="btn btn-primary mr-1">
                <span className="material-icons">open_in_new</span>
              </button>
            </a>
            <button
              type="button"
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#qbc-eshop-cart-clear-item-modal"
              data-id={props.id}
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="col-lg-8 cart-row-data">
          <h3>Product is no longer available</h3>
          <button onClick={() => props.removeItem(props.id)}>ok</button>
        </div>
      )}
    </div>
  );
};

export default CartLineItem;
