/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';

import CartSubtotal from './index.js';

const mountingContainer = document.getElementById(
  'qbc-eshop-cart-view-modal-footer'
) as HTMLDivElement;
const mountingDiv = document.createElement('div');

mountingDiv.id = 'qbc-eshop-cart-subtotal';
mountingContainer.insertAdjacentElement('afterbegin', mountingDiv);

render(<CartSubtotal />, mountingDiv);
