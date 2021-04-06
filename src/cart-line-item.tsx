/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC, useState, useEffect } from 'react';
import { toUSCurrency } from '@qbcart/utils';
import {
  useUpdateCart,
  useRemoveFromCart,
  useInventoryItem,
  useCustomPrice
} from '@qbcart/eshop-local-db';

interface Props {
  id: string;
  quantity: number;
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const CartLineItem: FC<Props> = (props: Props) => {
  const [inputQuantity, setInputQuantity] = useState(props.quantity.toString());
  const [updateReady, setUpdateReady] = useState(false);
  const updateCart = useUpdateCart(props.userLoggedIn);
  const removeFromCart = useRemoveFromCart(props.userLoggedIn);
  const [item] = useInventoryItem(props.id);
  const [customPrice] = useCustomPrice(props.id);
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
              data-target={`#${props.namespaceId}-remove-item-modal`}
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
