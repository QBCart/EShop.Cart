/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

// prettier-ignore
import React, { FC, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useClearCart } from '@qbcart/eshop-cart-hooks';

import ClearCartModalStyles from './style.js';

interface Props {
  userLoggedIn: boolean;
  showClearCartModal: boolean;
  setShowClearCartModal: Dispatch<SetStateAction<boolean>>;
}

const ClearCartModal: FC<Props> = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const clearCart = useClearCart(props.userLoggedIn);

  useEffect(() => {
    if (props.showClearCartModal) {
      const modal = ref.current!;
      modal.style.animationName = 'var(--clear-cart-modal-show)';
      modal.style.display = 'block';
    }
  }, [props.showClearCartModal, ref]);

  const hideModal = () => {
    const modal = ref.current!;
    modal.style.animationName = 'var(--clear-cart-modal-hide)';
  };

  const onAnimationEnd = async (): Promise<void> => {
    const modal = ref.current!;
    modal.style.animationName = '';

    if (modal.classList.contains('qbc-clear-cart-modal-visible')) {
      modal.classList.remove('qbc-clear-cart-modal-visible');
      modal.style.display = 'none';
      if (props.showClearCartModal) {
        props.setShowClearCartModal(false);
      }
    } else {
      modal.classList.add('qbc-clear-cart-modal-visible');
    }
  };

  return (
    <ClearCartModalStyles ref={ref} onAnimationEnd={() => onAnimationEnd()}>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="material-icons m-icon-36">delete</span>
            </h5>
            <div className="clear-title">Empty Cart</div>
          </div>
          <div className="modal-body">
            <span className="material-icons m-icon-36 mr-2">
              remove_shopping_cart
            </span>
            <div>Are you sure you want to clear your entire cart?</div>
            <span className="material-icons m-icon-36 ml-2">
              remove_shopping_cart
            </span>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                clearCart();
                hideModal();
              }}
              type="button"
              className="modal-footer-button button-red"
            >
              Yes, Clear My Cart
            </button>
            <button
              onClick={hideModal}
              type="button"
              className="modal-footer-button button-grey"
            >
              No, Keep My Cart
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </ClearCartModalStyles>
  );
};

export default ClearCartModal;
