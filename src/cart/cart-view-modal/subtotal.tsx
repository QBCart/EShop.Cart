/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC } from 'react';
import { toUSCurrency } from '@qbcart/utils';

interface Props {
  numOfItems: number;
}

const Subtotal: FC<Props> = (props: Props) => {
  const subtotal = 0; // TODO: useSubtotal() hook
  return (
    <div className="modal-footer-subtotal">
      <span className="material-icons">shopping_cart</span>
      Subtotal: {toUSCurrency(subtotal)} ({props.numOfItems} item
      {props.numOfItems === 1 ? '' : 's'})
    </div>
  );
};

export default Subtotal;
