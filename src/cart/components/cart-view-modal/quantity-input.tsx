import React, {
  ChangeEvent,
  FC,
  useState
} from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';

interface Props {
  quantity: number;
  itemId: string;
  changeItemQuantity(e: any): void;
}

const QuantityInput: FC<Props> = (props) => {
  const [updateReady, setUpdateReady] = useState(false);

  const changeItemInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    const inputValueNum = Number(inputValue);
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
  };

  const revertItemInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (!updateReady) {
      e.currentTarget.value = props.quantity.toString();
    }
  };

  return (
    <div>
      {console.log('rendered')}
      <label>Quantity: </label>
      <input
        id={`qty-input-${props.itemId}`}
        onChange={changeItemInputValue}
        onBlur={revertItemInputValue}
        type="number"
        min="1"
        defaultValue={props.quantity}
        className="quantity-input-cart form-control-sm ml-2 mr-1"
      ></input>
      {updateReady ? (
        <button
          data-id={props.itemId}
          className="btn btn-success cart-quantity-update"
          onClick={(e) => {
            setUpdateReady(false);
            props.changeItemQuantity(e);
          }}
        >
          update
        </button>
      ) : null}
    </div>
  );
};

export default QuantityInput;
