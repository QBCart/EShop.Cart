/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC } from 'react';
import { useCartItems } from '@qbcart/eshop-cart-hooks';

import CartLineItem from './cart-line-item.js';
import EmptyCart from './empty-cart.js';

interface Props {
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  customPriceTextColor: string;
  onSalePriceTextColor: string;
}

const CartLineItems: FC<Props> = (props: Props) => {
  console.log('CartLineItems rendered');
  const items = useCartItems(props.userLoggedIn);

  return items.length > 0 ? (
    <>
      {items.map((item) => (
        <CartLineItem
          key={item.id}
          id={item.id!}
          quantity={item.quantity!}
          imagesStorageUrl={props.imagesStorageUrl}
          userLoggedIn={props.userLoggedIn}
          customPriceTextColor={props.customPriceTextColor}
          onSalePriceTextColor={props.onSalePriceTextColor}
        />
      ))}
    </>
  ) : (
    <EmptyCart imagesStorageUrl={props.imagesStorageUrl} />
  );
};

export default CartLineItems;
