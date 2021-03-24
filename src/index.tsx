import {
  React,
  render
} from 'https://cdn.skypack.dev/@qbcart/eshop-skypack-deps';
import Cart from './cart';

const mountCart = (
  showToast: (header: string, body: string, duration: number) => void
): void => {
  const id = 'qbc-eshop-cart';
  const mountingDiv = document.getElementById(id);
  render(
    <Cart
      namespaceId={id}
      imagesStorageUrl={mountingDiv.dataset.imagesStorageUrl}
      userLoggedIn={Boolean(mountingDiv.dataset.userLoggedIn)}
      showToast={showToast}
      syncInterval={Number(mountingDiv.dataset.syncInterval)}
    />,
    mountingDiv
  );
};

export { mountCart };
