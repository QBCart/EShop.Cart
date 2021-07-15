/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

// prettier-ignore
import React, { FC, useEffect, useRef, Dispatch, SetStateAction } from 'react';
// prettier-ignore
import { useCartItems, useCartViewModal, useRemoveCartViewModal } from '@qbcart/eshop-cart-hooks';

import CartLineItem from '../cart-line-item/index.js';
import Subtotal from './subtotal.js';
import EmptyCart from './empty-cart.js';
import CartViewModalStyles from './style.js';

interface Props {
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  setShowClearCartModal: Dispatch<SetStateAction<boolean>>;
  setShowRemoveItemModal: Dispatch<SetStateAction<string>>;
  customPriceTextColor: string;
  onSalePriceTextColor: string;
}

const CartViewModal: FC<Props> = (props: Props) => {
  console.log('CartViewModal rendered');

  const ref = useRef<HTMLDivElement>(null);
  const show = useCartViewModal();
  const removeCartViewModal = useRemoveCartViewModal();
  const items = useCartItems(props.userLoggedIn);
  const numOfItems =
    items.length > 0
      ? items.map((item) => item.quantity!).reduce((a, b) => a + b)
      : 0;

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
          <div className="modal-body">
            {items.length > 0 ? (
              items.map((item) => (
                <CartLineItem
                  key={item.id}
                  id={item.id!}
                  quantity={item.quantity!}
                  imagesStorageUrl={props.imagesStorageUrl}
                  userLoggedIn={props.userLoggedIn}
                  setShowRemoveItemModal={props.setShowRemoveItemModal}
                  customPriceTextColor={props.customPriceTextColor}
                  onSalePriceTextColor={props.onSalePriceTextColor}
                />
              ))
            ) : (
              <EmptyCart imagesStorageUrl={props.imagesStorageUrl} />
            )}
          </div>
          <div className="modal-footer">
            <Subtotal numOfItems={numOfItems} />
            <div className="modal-footer-buttons">
              <button
                type="button"
                disabled={items.length < 1}
                className="cart-modal-button button-red"
                onClick={() => props.setShowClearCartModal(true)}
              >
                <span className="material-icons">delete</span>
              </button>
              <button
                type="button"
                disabled={items.length < 1}
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
