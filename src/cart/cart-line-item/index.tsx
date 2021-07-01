/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';
import { toUSCurrency } from '@qbcart/utils';
import {
  useUpdateCart,
  useRemoveFromCart,
  useRemoveCartViewModal
} from '@qbcart/eshop-cart-hooks';
// prettier-ignore
import { useInventoryItem, useCustomPricing } from '@qbcart/eshop-inventory-hooks';

import CartLineItemStyles from './style.js';

interface Props {
  id: string;
  quantity: number;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  setShowRemoveItemModal: Dispatch<SetStateAction<string>>;
}

const CartLineItem: FC<Props> = (props: Props) => {
  const removeCartViewModal = useRemoveCartViewModal();
  const [inputQuantity, setInputQuantity] = useState(props.quantity.toString());
  const [updateReady, setUpdateReady] = useState(false);
  const updateCart = useUpdateCart(props.userLoggedIn);
  const removeFromCart = useRemoveFromCart(props.userLoggedIn);
  const [item] = useInventoryItem(props.id);
  const [customPrice] = useCustomPricing(props.userLoggedIn, props.id);
  const price = customPrice ?? item?.SalesPrice ?? 0;

  useEffect(() => {
    setUpdateReady(inputQuantity !== props.quantity.toString());
  }, [inputQuantity, props.quantity]);

  useEffect(() => {
    setInputQuantity(props.quantity.toString());
  }, [props.quantity]);

  const updateItemQuantity = async () => {
    setUpdateReady(!(await updateCart(props.id, price, inputQuantity)));
  };

  const navigate = async (href: string) => {
    await removeCartViewModal();
    window.location.assign(href);
  };

  return (
    <CartLineItemStyles>
      <div
        className="cart-row-img"
        style={{
          backgroundImage: `url(${props.imagesStorageUrl}images/thumbnail/${props.id})`
        }}
      ></div>
      {item ? (
        <div className="cart-row-data">
          <div className="cart-row-top-data">
            <div className="cart-row-item-description truncate-overflow">
              {item.SalesDesc}
            </div>
            <div className="cart-row-item-price">
              Price: <b>{toUSCurrency(price)}</b>
            </div>
            <div className="cart-row-item-quantity">
              <label>Quantity: </label>
              <input
                onChange={(e) => setInputQuantity(e.target.value)}
                value={inputQuantity}
                type="number"
                min="1"
                className="quantity-input-cart"
              ></input>
              {updateReady ? (
                <button
                  className="cart-quantity-update"
                  onClick={updateItemQuantity}
                >
                  update
                </button>
              ) : null}
            </div>
            <div className="cart-row-item-total">
              Total:{' '}
              <b>
                {toUSCurrency(price * props.quantity)} ({props.quantity} item
                {props.quantity > 1 ? 's' : ''})
              </b>
            </div>
          </div>
          <div className="cart-row-bottom-buttons">
            <button
              type="button"
              className="cart-modal-button button-blue"
              onClick={() => navigate(item.Href)}
            >
              <span className="material-icons">open_in_new</span>
            </button>
            <button
              type="button"
              className="cart-modal-button button-red"
              onClick={() => props.setShowRemoveItemModal(props.id)}
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-row-data">
          <h3>Product is no longer available</h3>
          <button onClick={() => removeFromCart(props.id)}>ok</button>
        </div>
      )}
    </CartLineItemStyles>
  );
};

export default CartLineItem;
