/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';

import CartLineItems from './index.js';

const mountingContainer = document.getElementById(
  'qbc-eshop-cart-view-modal-footer'
) as HTMLDivElement;
const companySettings = document.getElementById(
  'qbc-eshop-company-settings'
) as HTMLDivElement;
const mountingDiv = document.createElement('div');

mountingDiv.id = 'qbc-eshop-cart-line-items';
mountingContainer.insertAdjacentElement('afterbegin', mountingDiv);

render(
  <CartLineItems
    imagesStorageUrl={companySettings.dataset.imagesStorageUrl!}
    userLoggedIn={Boolean(document.getElementById('qbc-eshop-user'))}
    customPriceTextColor={
      companySettings.dataset.customPriceTextColor || 'green'
    }
    onSalePriceTextColor={companySettings.dataset.onSalePriceTextColor || 'red'}
  />,
  mountingDiv
);
