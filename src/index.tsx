import { React } from './skypack';
import { render } from './skypack';
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

export default mountCart;
