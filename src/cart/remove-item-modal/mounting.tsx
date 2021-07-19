/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';

import RemoveItemModal from './index.js';

const globalMountingContainer = document.getElementById(
  'qbc-eshop-global-mounts'
) as HTMLDivElement;
const companySettings = document.getElementById(
  'qbc-eshop-company-settings'
) as HTMLDivElement;
const mountingDiv = document.createElement('div');

mountingDiv.id = 'qbc-eshop-remove-item-modal';
globalMountingContainer.appendChild(mountingDiv);

render(
  <RemoveItemModal
    imagesStorageUrl={companySettings.dataset.imagesStorageUrl!}
    userLoggedIn={Boolean(document.getElementById('qbc-eshop-user'))}
  />,
  mountingDiv
);
