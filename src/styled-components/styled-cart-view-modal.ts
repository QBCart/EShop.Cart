/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import styled from 'styled-components';

const StyledCartViewModal = styled.div`
  color: black;

  .m-icon-36 {
    font-size: 32px;
    vertical-align: text-top;
  }

  .modal-header {
    padding: 0.5rem 1rem;
  }

  .cart-title {
    font-size: 24px;
    margin-left: 5px;
  }

  .modal-header .close {
    margin: -0.75rem -1rem -1rem auto;
  }

  .cart-row {
    border-bottom: 1px solid lightgray;
    margin: 10px;
  }

  .cart-row-img {
    max-height: 200px;
    margin: 10px auto;
  }

  .cart-row-data {
    height: 200px;
  }

  .quantity-input-cart {
    width: 80px;
  }

  .cart-quantity-update {
    height: 31px;
    width: 64px;
    display: inline-flex;
    margin-bottom: 2px;
    align-items: center;
    justify-content: center;
  }
`;

export default StyledCartViewModal;
