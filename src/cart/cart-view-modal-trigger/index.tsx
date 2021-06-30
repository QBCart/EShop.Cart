/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC } from 'react';
import { useShowCartViewModal } from '@qbcart/eshop-cart-hooks';

const CartViewModalTrigger: FC = () => {
  const showCartViewModal = useShowCartViewModal();
  return (
    <button
      className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
      onClick={showCartViewModal}
    >
      shopping_cart
    </button>
  );
};

export default CartViewModalTrigger;
