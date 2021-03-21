import { React } from '../skypack';
import type { FC } from '../skypack';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import RemoveItemModal from './components/remove-item-modal';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  showToast: (header: string, body: string, duration: number) => void;
  isDev?: boolean;
}

const Cart: FC<Props> = (props: Props) => {
  return (
    <div>
      <CartViewModal
        namespaceId={props.namespaceId}
        imagesStorageUrl={props.imagesStorageUrl}
      />
      <ClearCartModal namespaceId={props.namespaceId} />
      <RemoveItemModal
        namespaceId={props.namespaceId}
        imagesStorageUrl={props.imagesStorageUrl}
      />
    </div>
  );
};

export default Cart;
