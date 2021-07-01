/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import styled, { keyframes } from 'styled-components';

const ClearCartModalShow = keyframes`
    from {
       opacity: 0;
    }
    to {
       opacity: 1;
    }
  `;

const ClearCartModalHide = keyframes`
    from {
       opacity: 1;
    }
    to {
       opacity: 0;
    }
  `;

const ClearCartModalStyles = styled.div`
  --clear-cart-modal-show: ${ClearCartModalShow};
  --clear-cart-modal-hide: ${ClearCartModalHide};
  --clear-cart-modal-width: 500px;
  --clear-cart-modal-height: 300px;

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
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2300;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2200;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: var(--clear-cart-modal-width);
    height: var(--clear-cart-modal-height);
    border: 2px solid black;
    border-radius: 4px;
    background-color: white;
  }

  .modal-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    padding: 0.5rem 1rem;
    color: #dc3545;
    background-color: darkslategray;
    border-bottom: 2px solid black;
    border-top-left-radius: 2px !important;
    border-top-right-radius: 2px !important;
  }

  .clear-title {
    font-size: 24px;
    margin-left: 5px;
    color: lightgray;
  }

  .modal-body {
    display: flex;
    justify-content: center;
  }

  .modal-body span {
    margin: -8px 20px;
  }

  .modal-footer {
    display: flex;
    height: 55px;
    justify-content: center;
  }

  .modal-footer-button {
    height: 35px;
    padding: 10px;
    color: white;
    border: none;
    border-radius: 3px;
    margin: 10px;
  }

  .modal-footer-button:hover {
    cursor: pointer;
  }

  .button-red {
    background-color: rgb(220, 53, 69);
  }

  .button-red:hover {
    background-color: rgb(210, 43, 59);
  }

  .button-grey {
    background-color: rgb(108, 117, 125);
  }

  .button-grey:hover {
    background-color: rgb(98, 107, 115);
  }

  /* Small to medium devices (portrait phones, 576px and below) */
  @media (max-width: 575.98px) {
    --clear-cart-modal-width: calc(100vw - 10px);

    .modal-body span {
      margin: 0 20px;
    }
  }

  /* Small to medium devices (portrait phones, 300px and below) */
  @media (max-width: 300px) {
    --clear-cart-modal-width: calc(100vw - 5px);

    .modal-footer-button {
      padding: 5px;
      margin: 5px;
    }

    .modal-body span {
      margin: 10px 10px;
    }
  }
`;

export default ClearCartModalStyles;
