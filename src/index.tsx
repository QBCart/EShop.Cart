/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React from 'react';
import { render } from 'react-dom';
import Cart from './cart.js';

(function () {
  const id = 'qbc-eshop-cart';
  const mountingDiv = document.getElementById(id)!;
  render(
    <Cart
      namespaceId={id}
      imagesStorageUrl={mountingDiv.dataset.imagesStorageUrl!}
      userLoggedIn={Boolean(mountingDiv.dataset.userLoggedIn)}
      syncInterval={Number(mountingDiv.dataset.syncInterval)}
    />,
    mountingDiv
  );
})();
