import * as React from './skypack';
import { render } from './skypack';
import Cart from './cart';

const mountCart = (
  showToast: (header: string, body: string, duration: number) => void,
  cartAPI?: string
) => {
  const cartDataSet = document.getElementById('qbc-eshop-cart')!.dataset;
  render(
    <Cart
      userLoggedIn={Boolean(cartDataSet.userLoggedIn)}
      imagesStorageUrl={cartDataSet.imagesStorageUrl!}
      showToast={showToast}
      cartAPI={cartAPI}
    />,
    document.getElementById('qbc-eshop-cart')
  );
};

export default mountCart;
