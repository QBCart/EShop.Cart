/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

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
    <ClearCartModalStyles
      ref={ref}
      onAnimationEnd={() => onAnimationEnd()}
      className="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header clear-header d-flex justify-content-start">
            <h5 className="modal-title" id="staticBackdropLabel">
              <span className="material-icons m-icon-36">delete</span>
            </h5>
            <div className="clear-title">Empty Cart</div>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center">
              <span className="material-icons m-icon-36 mr-2">
                remove_shopping_cart
              </span>
              Are you sure you want to clear your entire cart?
              <span className="material-icons m-icon-36 ml-2">
                remove_shopping_cart
              </span>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              onClick={() => {
                clearCart();
                hideModal();
              }}
              type="button"
              className="btn btn-danger"
            >
              Yes, Clear My Cart
            </button>
            <button
              onClick={hideModal}
              type="button"
              className="btn btn-secondary"
            >
              No, Keep My Cart
            </button>
          </div>
        </div>
      </div>
    </ClearCartModalStyles>
  );
};

export default ClearCartModal;
