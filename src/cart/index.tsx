/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC, useState } from 'react';

import CartViewModal from './cart-view-modal/index.js';
import ClearCartModal from './clear-cart-modal/index.js';
import RemoveItemModal from './remove-item-modal/index.js';

interface Props {
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  customPriceTextColor: string;
  onSalePriceTextColor: string;
}

const Cart: FC<Props> = (props: Props) => {
  console.log('Cart rendered');

  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState('');

  return (
    <div>
      <CartViewModal
        imagesStorageUrl={props.imagesStorageUrl}
        userLoggedIn={props.userLoggedIn}
        setShowClearCartModal={setShowClearCartModal}
        setShowRemoveItemModal={setShowRemoveItemModal}
        customPriceTextColor={props.customPriceTextColor}
        onSalePriceTextColor={props.onSalePriceTextColor}
      />
      <ClearCartModal
        userLoggedIn={props.userLoggedIn}
        showClearCartModal={showClearCartModal}
        setShowClearCartModal={setShowClearCartModal}
      />
      <RemoveItemModal
        imagesStorageUrl={props.imagesStorageUrl}
        userLoggedIn={props.userLoggedIn}
        showRemoveItemModal={showRemoveItemModal}
        setShowRemoveItemModal={setShowRemoveItemModal}
      />
    </div>
  );
};

export default Cart;
