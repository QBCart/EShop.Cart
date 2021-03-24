import { React } from 'https://cdn.skypack.dev/@qbcart/eshop-skypack-deps';
import { useLocalDBSync } from 'https://cdn.skypack.dev/@qbcart/eshop-local-db';
import CartViewModal from './components/cart-view-modal';
import ClearCartModal from './components/clear-cart-modal';
import RemoveItemModal from './components/remove-item-modal';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  showToast: (header: string, body: string, duration: number) => void;
  syncInterval: number;
  isDev?: boolean;
}

const Cart: React.FC<Props> = (props: Props) => {
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
