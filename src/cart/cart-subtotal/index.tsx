/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC, useState, useEffect } from 'react';
import { useSubtotal, useRemoveSubtotal } from '@qbcart/eshop-cart-hooks';
import { toUSCurrency } from '@qbcart/utils';

const CartSubtotal: FC = () => {
  console.log('Subtotal rendered');

  const [subtotals, setSubtotals] = useState<{
    [key: string]: { amount: number; quantity: number };
  }>({});
  const subtotal = useSubtotal();
  const removeSubtotal = useRemoveSubtotal();
  const numOfItems =
    Object.keys(subtotals).length > 0
      ? Object.values(subtotals).reduce((q, { quantity }) => q + quantity, 0)
      : 0;

  useEffect(() => {
    if (subtotal) {
      setSubtotals((subtotals) => {
        subtotals[subtotal.id] = {
          amount: subtotal.amount,
          quantity: subtotal.quantity
        };
        return subtotals;
      });
      removeSubtotal(subtotal.id);
    }
  }, [subtotal]);

  return (
    <div className="modal-footer-subtotal">
      <span className="material-icons">shopping_cart</span>
      Subtotal:{' '}
      {toUSCurrency(
        Object.keys(subtotals).length > 0
          ? Object.values(subtotals).reduce((a, { amount }) => a + amount, 0)
          : 0
      )}{' '}
      ({numOfItems} item
      {numOfItems === 1 ? '' : 's'})
    </div>
  );
};

export default CartSubtotal;
