import { React } from '../../../skypack';
import { ChangeEvent, FC, useState, useEffect } from '../../../skypack';

interface Props {
  quantity: number;
  itemId: string;
  changeItemQuantity(e: any): void;
}

const QuantityInput: FC<Props> = (props) => {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const quantityInput = document.getElementById(
      `qty-input-${props.itemId}`
    ) as HTMLInputElement;
    quantityInput.value = props.quantity.toString();
  }, [props.quantity]);

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
    <div className="mb-1">
      <label>Quantity: </label>
      <input
        id={`qty-input-${props.itemId}`}
        onChange={changeItemInputValue}
        onBlur={revertItemInputValue}
        type="number"
        min="1"
        className="quantity-input-cart form-control-sm ml-2 mr-1"
      ></input>
      {updateReady ? (
        <button
          className="btn btn-success cart-quantity-update"
          onClick={() => {
            setUpdateReady(false);
            props.changeItemQuantity(props.itemId);
          }}
        >
          update
        </button>
      ) : null}
    </div>
  );
};

export default QuantityInput;
