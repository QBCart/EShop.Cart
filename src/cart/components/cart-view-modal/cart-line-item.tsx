import { React } from 'https://cdn.skypack.dev/@qbcart/eshop-skypack-deps';
import {
  toUSCurrency,
  toWholeNumberGreaterThanZero
} from 'https://cdn.skypack.dev/@qbcart/utils';
import {
  useUpdateCart,
  useRemoveFromCart,
  useInventoryItem,
  useCustomPrice
} from 'https://cdn.skypack.dev/@qbcart/eshop-local-db';

interface Props {
  id: string;
  quantity: number;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const CartLineItem: React.FC<Props> = (props: Props) => {
  const [inputQuantity, setInputQuantity] = React.useState(
    props.quantity.toString()
  );
  const [updateReady, setUpdateReady] = React.useState(false);
  const updateCart = useUpdateCart(props.userLoggedIn);
  const removeFromCart = useRemoveFromCart(props.userLoggedIn);
  const [item] = useInventoryItem(props.id);
  const [customPrice] = useCustomPrice(props.id);
  const price = customPrice ?? item?.SalesPrice ?? 0;

  React.useEffect(() => {
    const inputValueNum = toWholeNumberGreaterThanZero(inputQuantity);
    if (inputValueNum && inputValueNum !== props.quantity) {
      setUpdateReady(true);
    } else {
      setUpdateReady(false);
    }
  }, [inputQuantity, props.quantity]);

  React.useEffect(() => {
    setInputQuantity(props.quantity.toString());
  }, [props.quantity]);

  const revertInputQuantity = () => {
    if (!updateReady) {
      setInputQuantity(props.quantity.toString());
    }
  };

  const updateItemQuantity = async () => {
    const error = await updateCart(props.id, price, Number(inputQuantity));
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
          <button onClick={() => removeFromCart(props.id)}>ok</button>
        </div>
      )}
    </div>
  );
};

export default CartLineItem;
