/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 * This code can only be used and/or distributed with express permission.
 */

import type { User } from '@qbcart/types';
import type CartItem from '@qbcart/types/types/internals/cart-item';
import type CartItems from '@qbcart/types/types/internals/cart-items';
import reconcile from './reconcile';
import validateCustomerPricing from './validateCustomerPricing';

export default async function validateCartItems(items: CartItems, user: User) {
  if (user) {
    await reconcile(items, user);
  }

  const removedItems: CartItem[] = [];

  // TODO: Validate
  // for (let itemId in items) {
  //     cart.items[itemId].salesDesc = 'Hello World'
  // }

  if (user) {
    await validateCustomerPricing(items);
  }

  return removedItems;
}
