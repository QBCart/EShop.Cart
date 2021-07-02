/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC } from 'react';

import CartLineItemStyles from './style.js';

interface Props {
  imagesStorageUrl: string;
}

const EmptyCart: FC<Props> = (props: Props) => {
  return (
    <CartLineItemStyles>
      <div
        className="cart-row-img"
        style={{
          backgroundImage: `url(${props.imagesStorageUrl}images/empty-cart.gif)`
        }}
      ></div>
      <div className="cart-row-data">
        <div className="cart-row-top-data">
          <div className="empty-cart">Your cart is empty!</div>
        </div>
      </div>
    </CartLineItemStyles>
  );
};

export default EmptyCart;
