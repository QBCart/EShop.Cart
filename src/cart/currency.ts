/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 * This code can only be used and/or distributed with express permission.
 */

const usCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function toUSCurrency(num) {
  return usCurrencyFormatter.format(num);
}

export default toUSCurrency;
