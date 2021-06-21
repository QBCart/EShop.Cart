/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC } from 'react';

import CartViewModal from './cart-view-modal/index.js';
import ClearCartModal from './clear-cart-modal/index.js';
import RemoveItemModal from './remove-item-modal/index.js';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const Cart: FC<Props> = (props: Props) => {
  return (
    <div>
      <CartViewModal
        namespaceId={props.namespaceId}
        imagesStorageUrl={props.imagesStorageUrl}
        userLoggedIn={props.userLoggedIn}
      />
      <ClearCartModal
        namespaceId={props.namespaceId}
        userLoggedIn={props.userLoggedIn}
      />
      <RemoveItemModal
        namespaceId={props.namespaceId}
        imagesStorageUrl={props.imagesStorageUrl}
        userLoggedIn={props.userLoggedIn}
      />
    </div>
  );
};

export default Cart;
