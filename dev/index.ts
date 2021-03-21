import mountCart from '../src/index';
import { mountToast, showToast } from '@qbcart/toast';

mountToast();
mountCart(showToast);
