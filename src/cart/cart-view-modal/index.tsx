/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import React, { FC, useEffect, useRef } from 'react';
// prettier-ignore
import { useCartItems ,useCartViewModal, useRemoveCartViewModal } from '@qbcart/eshop-cart-hooks';
import { toUSCurrency } from '@qbcart/utils';

import CartLineItem from '../cart-line-item/index.js';
import CartViewModalStyles from './style.js';

interface Props {
  namespaceId: string;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
}

const CartViewModal: FC<Props> = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useCartViewModal();
  const removeCartViewModal = useRemoveCartViewModal();
  const items = useCartItems(props.userLoggedIn);

  const subtotal =
    (items?.length ?? 0) > 0
      ? items!
          .map((item) => item.price! * item.quantity!)
          .reduce((a, b) => a + b)
      : 0;
  const numOfItems =
    (items?.length ?? 0) > 0
      ? items!.map((item) => item.quantity!).reduce((a, b) => a + b)
      : 0;

  useEffect(() => {
    if (show) {
      const modal = ref.current!;
      modal.style.animationName = 'var(--cart-view-modal-show)';
      modal.style.display = 'block';
    }
  }, [show, ref]);

  const hideModal = () => {
    const modal = ref.current!;
    modal.style.animationName = 'var(--cart-view-modal-hide)';
  };

  const onAnimationEnd = async (): Promise<void> => {
    const modal = ref.current!;
    modal.style.animationName = '';

    if (modal.classList.contains('qbc-cart-view-modal-modal-visible')) {
      modal.classList.remove('qbc-cart-view-modal-modal-visible');
      modal.style.display = 'none';
      if (show) {
        removeCartViewModal();
      }
    } else {
      modal.classList.add('qbc-cart-view-modal-modal-visible');
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
          <div className="modal-header">
            <div className="modal-title">
              <span className="material-icons m-icon-36">shopping_cart</span>
            </div>
            <div className="cart-title">Shopping Cart</div>
            <button
              type="button"
              className="close"
              onClick={hideModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {(items?.length ?? 0) > 0 ? (
              items!.map((item) => (
                <CartLineItem
                  key={item.id}
                  id={item.id!}
                  quantity={item.quantity!}
                  namespaceId={props.namespaceId}
                  imagesStorageUrl={props.imagesStorageUrl}
                  userLoggedIn={props.userLoggedIn}
                />
              ))
            ) : (
              <div className="empty-cart-message">
                Your cart is currently empty.
              </div>
            )}
          </div>
          {(items?.length ?? 0) > 0 ? (
            <div className="modal-footer">
              <div className="modal-footer-subtotals">
                Subtotal: {toUSCurrency(subtotal)} ({numOfItems} item
                {numOfItems === 1 ? '' : 's'})
              </div>
              <div className="modal-footer-buttons">
                <button
                  type="button"
                  className="cart-modal-button button-red"
                  data-toggle="modal"
                  data-target={`#${props.namespaceId}-clear-cart-modal`}
                >
                  <span className="material-icons">delete</span>
                </button>
                <a
                  href="/Checkout"
                  // onMouseDown={hideModal}
                >
                  <button
                    type="button"
                    className="cart-modal-button button-green"
                  >
                    <span className="material-icons">payment</span>
                  </button>
                </a>
                <button
                  type="button"
                  className="cart-modal-button button-grey"
                  onClick={hideModal}
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </CartViewModalStyles>
  );
};

export default CartViewModal;
