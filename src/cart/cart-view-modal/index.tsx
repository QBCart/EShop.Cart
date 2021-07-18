/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC, useEffect, useRef } from 'react';
import {
  useCartViewModal,
  useRemoveCartViewModal
} from '@qbcart/eshop-cart-hooks';

import CartViewModalStyles from './style.js';

const CartViewModal: FC = () => {
  console.log('CartViewModal rendered');

  const ref = useRef<HTMLDivElement>(null);
  const show = useCartViewModal();
  const removeCartViewModal = useRemoveCartViewModal();

  useEffect(() => {
    if (show) {
      const modal = ref.current!;
      modal.style.animationName = 'var(--cart-view-modal-show)';
      modal.style.display = 'block';
    }
  }, [show]);

  const hideModal = () => {
    const modal = ref.current!;
    modal.style.animationName = 'var(--cart-view-modal-hide)';
  };

  const navigate = async (href: string) => {
    await removeCartViewModal();
    window.location.assign(href);
  };

  const onAnimationEnd = async (): Promise<void> => {
    const modal = ref.current!;
    modal.style.animationName = '';

    if (modal.classList.contains('qbc-cart-view-modal-visible')) {
      modal.classList.remove('qbc-cart-view-modal-visible');
      modal.style.display = 'none';
      if (show) {
        removeCartViewModal();
      }
    } else {
      modal.classList.add('qbc-cart-view-modal-visible');
    }
  };

  return (
    <CartViewModalStyles
      ref={ref}
      onAnimationEnd={() => onAnimationEnd()}
      className="modal"
    >
      <div className="modal-wrapper">
        <div className="modal-content">
          <div id="qbc-eshop-cart-view-modal-body" className="modal-body"></div>
          <div id="qbc-eshop-cart-view-modal-footer" className="modal-footer">
            <div className="modal-footer-buttons">
              <button
                type="button"
                //disabled={items.length < 1}
                className="cart-modal-button button-red"
                // onClick={() => props.setShowClearCartModal(true)}
              >
                <span className="material-icons">delete</span>
              </button>
              <button
                type="button"
                //disabled={items.length < 1}
                className="cart-modal-button button-green"
                onClick={() => navigate('/Checkout')}
              >
                <span className="material-icons">payment</span>
              </button>
              <button
                type="button"
                className="cart-modal-button button-grey"
                onClick={hideModal}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </CartViewModalStyles>
  );
};

export default CartViewModal;
