import mountCart from '../src/index';
import { mountToast, showToast } from '@qbcart/toast';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mountProductModal from '@qbcart/eshop-product-modal';

mountToast();
mountProductModal();
mountCart(showToast);
