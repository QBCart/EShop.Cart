/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC } from 'react';
import { useRemoveFromCart } from '@qbcart/eshop-cart-hooks';

import CartLineItemStyles from '../cart-line-item/style.js';

interface Props {
  id: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const NotAvailable: FC<Props> = (props: Props) => {
  const removeFromCart = useRemoveFromCart(props.userLoggedIn);
  return (
    <CartLineItemStyles>
      <div
        className="cart-row-img"
        style={{
          backgroundImage: `url(${props.imagesStorageUrl}images/thumbnail/${props.id})`
        }}
      >
        <div
          className="cart-row-img"
          style={{
            backgroundImage: `url(${props.imagesStorageUrl}images/product-not-available.jpg)`
          }}
        ></div>
      </div>
      <div className="cart-row-data">
        <div className="cart-row-top-data">
          <div className="not-available">
            Sorry, this item is no longer available.
          </div>
        </div>
        <div className="cart-row-bottom-buttons">
          <button
            type="button"
            className="cart-modal-button button-red"
            onClick={() => removeFromCart(props.id)}
          >
            <span className="material-icons">delete</span>
          </button>
        </div>
      </div>
    </CartLineItemStyles>
  );
};

export default NotAvailable;
