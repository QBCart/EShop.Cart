import mountCart from '../src/index';

mountCart(
  Boolean(document.getElementById('qbc-eshop-cart')!.dataset.userLoggedIn),
  '/cart/get/index.json'
);
