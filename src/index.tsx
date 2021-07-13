/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';

import Cart from './cart/index.js';
import CartViewModalTrigger from './cart/cart-view-modal-trigger/index.js';

/**
 * Mounting code for cart.
 */
const globalMountsContainer = document.getElementById(
  'qbc-eshop-global-mounts'
)!;
const cartMountingDiv = document.createElement('div');
const companySettings = document.getElementById(
  'qbc-eshop-company-settings'
) as HTMLDivElement;

cartMountingDiv.id = 'qbc-eshop-cart';
globalMountsContainer.appendChild(cartMountingDiv);

render(
  <Cart
    imagesStorageUrl={companySettings.dataset.imagesStorageUrl!}
    userLoggedIn={Boolean(document.getElementById('qbc-eshop-user'))}
    customPriceTextColor={
      companySettings.dataset.customPriceTextColor || 'green'
    }
    onSalePriceTextColor={companySettings.dataset.onSalePriceTextColor || 'red'}
  />,
  cartMountingDiv
);

/**
 * Mounting code for cart view modal trigger.
 */
const topAppBarActions = document.getElementById(
  'qbc-eshop-top-app-bar-actions'
)!;
const cartViewModalTriggerMountingDiv = document.createElement('div');

cartViewModalTriggerMountingDiv.id = 'qbc-eshop-cart-view-trigger';
topAppBarActions.insertAdjacentElement(
  'beforeend',
  cartViewModalTriggerMountingDiv
);

render(<CartViewModalTrigger />, cartViewModalTriggerMountingDiv);
