/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import styled, { keyframes } from 'styled-components';

const CartViewModalShow = keyframes`
    from {
       opacity: 0;
    }
    to {
       opacity: 1;
    }
  `;

const CartViewModalHide = keyframes`
    from {
       opacity: 1;
    }
    to {
       opacity: 0;
    }
  `;

const CartViewModalStyles = styled.div`
  --cart-view-modal-show: ${CartViewModalShow};
  --cart-view-modal-hide: ${CartViewModalHide};
  --cart-view-modal-width: calc(100vw - 300px);
  /* --cart-view-modal-height: calc(var(--cart-view-modal-width) * 0.7); */
  --cart-view-modal-height: calc(100vh - 130px);
  --line-height-dynamic-lg: calc(var(--cart-view-modal-width) / 26);
  --line-height-dynamic-md: calc(var(--cart-view-modal-width) / 30);

  display: none;
  animation-duration: 0.5s;
  color: black;

  .m-icon-36 {
    font-size: 32px;
    vertical-align: text-top;
  }

  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: var(--cart-view-modal-width);
    max-height: var(--cart-view-modal-height);
    border: 1px solid lightgray;
    border-radius: 4px;
    background-color: white;
  }

  .modal-header {
    padding: 7px 10px;
    height: 50px;
    display: flex;
    border-bottom: 1px solid lightgray;
  }

  .cart-title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    margin-left: 5px;
  }

  .modal-header .close {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    font-size: 24px;
    border: none;
    background-color: transparent;
    color: gray;
    margin: 7px 0px 7px auto;
  }

  .modal-header .close:hover {
    color: darkslategray;
    cursor: pointer;
  }

  .modal-body {
    overflow-y: auto;
  }

  .empty-cart-message {
    display: flex;
    height: calc(var(--cart-view-modal-height) - 60px);
    width: 100%;
    padding: 20px;
    font-size: 20px;
    color: rgb(240, 173, 78);
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgray;
    padding: 10px 20px;
  }

  .modal-footer-subtotals,
  .modal-footer-subtotals .material-icons {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }

  .modal-footer-subtotals .material-icons {
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: 500;
    margin-right: 5px;
  }

  .modal-footer-buttons {
    display: flex;
    justify-content: flex-end;
    width: 120px;
  }

  .cart-modal-button {
    height: 30px;
    width: 40px;
    color: white;
    border: none;
    border-radius: 3px;
    margin-left: 5px;
  }

  .cart-modal-button:hover {
    cursor: pointer;
  }

  .button-red {
    background-color: rgb(220, 53, 69);
  }

  .button-red:hover {
    background-color: rgb(210, 43, 59);
  }

  .button-blue {
    background-color: rgb(10, 116, 255);
  }

  .button-blue:hover {
    background-color: rgb(0, 106, 245);
  }

  .button-green {
    background-color: rgb(92, 184, 92);
  }

  .button-green:hover {
    background-color: rgb(82, 174, 82);
  }

  .button-grey {
    background-color: rgb(108, 117, 125);
  }

  .button-grey:hover {
    background-color: rgb(98, 107, 115);
  }

  /* Large devices (desktops, 1200px and up) */
  @media (min-width: 1200px) {
    --cart-view-modal-width: 900px;
  }

  /* Small to medium devices (portrait tablets, 1200px and below) */
  @media (max-width: 1199.98px) {
    --cart-view-modal-width: calc(100vw - 50px);
  }

  /* Small to medium devices (portrait phones, 576px and below) */
  @media (max-width: 575.98px) {
    --cart-view-modal-width: calc(100vw - 10px);
    --cart-view-modal-height: 85vh;

    .modal-wrapper {
      justify-content: center;
      align-items: flex-start;
    }

    .modal-content {
      margin-top: 5px;
    }

    .modal-footer-subtotals {
      width: calc(var(--cart-view-modal-width) - 140px);
      font-size: var(--line-height-dynamic-lg);
    }
    .modal-footer-subtotals .material-icons {
      font-size: calc(var(--line-height-dynamic-lg) * 1.4);
    }

    .cart-modal-button {
      height: 30px;
      width: 36px;
      margin-left: 4px;
    }

    .modal-footer-buttons {
      width: 115px;
    }

    .modal-footer {
      padding: 10px 10px;
    }
  }

  /* Small to medium devices (portrait phones, 350px and below) */
  @media (max-width: 350px) {
    --cart-view-modal-width: calc(100vw - 5px);

    .modal-footer {
      padding: 10px 5px;
    }

    .modal-content {
      margin-bottom: 3px;
    }
  }
`;

export default CartViewModalStyles;
