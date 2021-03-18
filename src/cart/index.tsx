import { React } from '../skypack';
import type { FC } from '../skypack';
import { useCart } from '@qbcart/eshop-local-db';

import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import RemoveItemModal from './components/remove-item-modal';

interface Props {
  userLoggedIn: boolean;
  imagesStorageUrl: string;
  showToast: (header: string, body: string, duration: number) => void;
  cartAPI?: string;
  isDev?: boolean;
  namespaceId: string;
}

const Cart: FC<Props> = (props) => {
  const [cartItems, updateItem, removeItem, clearCart] = useCart(
    props.userLoggedIn,
    props.isDev
  );

  return (
    <div>
      <CartViewModal
        imagesStorageUrl={props.imagesStorageUrl}
        cartItems={cartItems}
        updateItem={updateItem}
        removeItem={removeItem}
        namespaceId={props.namespaceId}
      />
      <ClearCartModal clearCart={clearCart} namespaceId={props.namespaceId} />
      <RemoveItemModal
        removeItem={removeItem}
        imagesStorageUrl={props.imagesStorageUrl}
        namespaceId={props.namespaceId}
      />
    </div>
  );
};

export default Cart;
