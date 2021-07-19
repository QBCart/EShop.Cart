/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';

import ClearCartModal from './index.js';

const globalMountingContainer = document.getElementById(
  'qbc-eshop-global-mounts'
) as HTMLDivElement;
const mountingDiv = document.createElement('div');

mountingDiv.id = 'qbc-eshop-clear-cart-modal';
globalMountingContainer.appendChild(mountingDiv);

render(
  <ClearCartModal
    userLoggedIn={Boolean(document.getElementById('qbc-eshop-user'))}
  />,
  mountingDiv
);
