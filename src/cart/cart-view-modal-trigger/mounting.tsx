/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';

import CartViewModalTrigger from './index.js';

const topAppBarActions = document.getElementById(
  'qbc-eshop-top-app-bar-actions'
)!;
const mountingDiv = document.createElement('div');

mountingDiv.id = 'qbc-eshop-cart-view-modal-trigger';
topAppBarActions.insertAdjacentElement('beforeend', mountingDiv);

render(<CartViewModalTrigger />, mountingDiv);
