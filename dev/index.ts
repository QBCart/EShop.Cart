import mountCart from '../src/index';
import { mountToast, showToast } from '@qbcart/toast';

mountToast();
//mountCart('http://localhost:7070/cart'); // gateway
mountCart(showToast, 'http://localhost:7078'); // direct api
