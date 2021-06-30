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
  --cart-view-modal-height: calc(var(--cart-view-modal-width) * 0.7);
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
    z-index: 2000;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: var(--cart-view-modal-width);
    height: var(--cart-view-modal-height);
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
    overflow-y: scroll;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgray;
    padding: 10px 20px;
  }

  .modal-footer-subtotals {
    font-size: 20px;
    font-weight: 500;
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
    background-color: rgb(218, 40, 70);
  }

  .button-blue {
    background-color: rgb(10, 116, 255);
  }

  .button-green {
    background-color: rgb(50, 170, 70);
  }

  .button-grey {
    background-color: rgb(108, 117, 125);
  }

  /* Large devices (desktops, 1200px and up) */
  @media (min-width: 1200px) {
    --cart-view-modal-width: 900px;
  }

  /* Small to medium devices (landscape phones, 992px and below) */
  @media (max-width: 991.98px) {
    --cart-view-modal-width: calc(100vw - 50px);
  }

  /* Small to medium devices (portrait phones, 576px and below) */
  @media (max-width: 575.98px) {
    --cart-view-modal-width: calc(100vw - 10px);
    --cart-view-modal-height: calc(100vh - 124px);
  }
`;

export default CartViewModalStyles;
