import React, { FC } from 'react';
import { useLocalDBSync } from '@qbcart/eshop-local-db';
import CartViewModal from './cart-view-modal.js';
import ClearCartModal from './clear-cart-modal.js';
import RemoveItemModal from './remove-item-modal.js';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  syncInterval: number;
  isDev?: boolean;
}

const Cart: FC<Props> = (props: Props) => {
  useLocalDBSync(props.syncInterval, props.isDev);
  return (
    <div>
      <CartViewModal
        namespaceId={props.namespaceId}
        imagesStorageUrl={props.imagesStorageUrl}
        userLoggedIn={props.userLoggedIn}
      />
      <ClearCartModal
        namespaceId={props.namespaceId}
        userLoggedIn={props.userLoggedIn}
      />
      <RemoveItemModal
        namespaceId={props.namespaceId}
        imagesStorageUrl={props.imagesStorageUrl}
        userLoggedIn={props.userLoggedIn}
      />
    </div>
  );
};

export default Cart;
