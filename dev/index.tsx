import { mountToast, showToast } from 'https://cdn.skypack.dev/@qbcart/toast';
import { mountProductModal } from 'https://cdn.skypack.dev/@qbcart/eshop-product-modal';
import mountCart from '../src/index';

mountToast();
mountProductModal(showToast);
mountCart(showToast);
