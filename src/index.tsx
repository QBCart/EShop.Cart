import { React } from './skypack';
import { render } from './skypack';
import Cart from './cart';

const mountCart = (
  showToast: (header: string, body: string, duration: number) => void,
  cartAPI?: string
) => {
  const id = 'qbc-eshop-cart';
  const mountingDiv = document.getElementById(id);
  render(
    <Cart
      userLoggedIn={Boolean(mountingDiv.dataset.userLoggedIn)}
      imagesStorageUrl={mountingDiv.dataset.imagesStorageUrl!}
      showToast={showToast}
      cartAPI={cartAPI}
    />,
    mountingDiv
  );
};

export default mountCart;
