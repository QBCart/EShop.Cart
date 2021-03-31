import React from 'react';
import { render } from 'react-dom';
import Cart from './cart/index.js';

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
