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

const globalMountsContainer = document.getElementById(
  'qbc-eshop-global-mounts'
)!;
const mountingDiv = document.createElement('div');

mountingDiv.id = 'qbc-eshop-cart';
globalMountsContainer.appendChild(mountingDiv);

render(
  <Cart
    namespaceId={mountingDiv.id}
    imagesStorageUrl={
      document.getElementById('qbc-eshop-company-settings')!.dataset
        .imagesStorageUrl!
    }
    userLoggedIn={Boolean(document.getElementById('qbc-eshop-user'))}
  />,
  mountingDiv
);
