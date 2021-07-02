/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import styled from 'styled-components';

const CartLineItemStyles = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  margin: 10px;

  .empty-cart {
    font-size: 20px;
    font-weight: 500;
    margin-top: 90px;
  }

  .cart-row-img {
    width: calc((var(--cart-view-modal-width) - 20px) / 3);
    height: 180px;
    margin: 10px 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .cart-row-data {
    height: 200px;
    width: calc(((var(--cart-view-modal-width) - 20px) / 3) * 2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10px 20px 40px;
  }

  .cart-row-item-description {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .truncate-overflow {
    --lh: 24px;
    --max-lines: 2;
    position: relative;
    max-height: calc(var(--lh) * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem; /* space for ellipsis */
  }
  .truncate-overflow::before {
    position: absolute;
    content: '...';
    inset-block-end: 0; /* "bottom" */
    inset-inline-end: 0; /* "right" */
    bottom: 0; /* "bottom" */
    right: 0; /* "right" */
  }
  .truncate-overflow::after {
    content: '   ';
    position: absolute;
    inset-inline-end: 0; /* "right" */
    right: 0; /* "right" */
    width: 1rem;
    height: var(--lh);
    background-color: white;
  }

  .cart-row-item-price {
    margin-bottom: 10px;
  }

  .cart-row-item-quantity {
    margin-bottom: 10px;
  }

  .quantity-input-cart {
    width: 80px;
    height: 30px;
    border: 2px solid darkslategray;
    border-radius: 3px;
    padding: 5px;
  }

  .cart-quantity-update {
    height: 30px;
    width: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: none;
    border-radius: 3px;
    margin-left: 5px;
    background-color: rgb(50, 170, 70);
  }

  .cart-quantity-update:hover {
    cursor: pointer;
  }

  .cart-row-item-total {
  }

  .cart-row-bottom-buttons {
    display: flex;
    justify-content: flex-end;
  }

  /* Small to medium devices (portrait phones, 576px and below) */
  @media (max-width: 575.98px) {
    .cart-row-item-description {
      font-size: var(--line-height-dynamic-lg);
    }

    .truncate-overflow {
      --lh: calc(var(--line-height-dynamic-lg) * 1.15);
    }
    .cart-row-item-price {
      font-size: var(--line-height-dynamic-md);
    }

    .cart-row-item-quantity {
      font-size: var(--line-height-dynamic-md);
    }

    .quantity-input-cart {
      width: 60px;
    }

    .cart-row-item-total {
      font-size: var(--line-height-dynamic-md);
    }
  }

  /* Small to medium devices (portrait phones, 350px and below) */
  @media (max-width: 350px) {
    --cart-view-modal-width: calc(100vw - 5px);
    --cart-view-modal-height: calc(100vh - 124px);

    .modal-footer-subtotals {
      width: calc(var(--cart-view-modal-width) - 140px);
    }

    .modal-footer-buttons {
      width: 115px;
    }

    .cart-modal-button {
      height: 30px;
      width: 36px;
      margin-left: 4px;
    }

    .modal-footer {
      padding: 10px 10px;
    }
  }
`;

export default CartLineItemStyles;
