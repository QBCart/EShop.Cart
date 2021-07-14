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

interface Props {
  numOfItems: number;
}

const Subtotal: FC<Props> = (props: Props) => {
  const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});
  const subtotal = useSubtotal();
  const removeSubtotal = useRemoveSubtotal();

  // useEffect(() => {
  //   console.log('subtotals render');
  // });

  useEffect(() => {
    if (subtotal) {
      setSubtotals((subtotals) => {
        subtotals[subtotal.id] = subtotal.amount;
        // console.log(subtotals)
        return subtotals;
      });
      removeSubtotal(subtotal.id);
    }
  }, [subtotal, removeSubtotal]);

  return (
    <div className="modal-footer-subtotal">
      <span className="material-icons">shopping_cart</span>
      Subtotal:{' '}
      {toUSCurrency(
        Object.keys(subtotals).length > 0
          ? Object.values(subtotals).reduce((a, b) => a + b)
          : 0
      )}{' '}
      ({props.numOfItems} item
      {props.numOfItems === 1 ? '' : 's'})
    </div>
  );
};

export default Subtotal;
