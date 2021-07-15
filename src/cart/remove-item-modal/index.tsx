/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

// prettier-ignore
import React, { FC, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useInventoryItem } from '@qbcart/eshop-inventory-hooks';
import { useRemoveFromCart } from '@qbcart/eshop-cart-hooks';

import RemoveItemModalStyles from './style.js';

interface Props {
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  showRemoveItemModal: string;
  setShowRemoveItemModal: Dispatch<SetStateAction<string>>;
}

const RemoveItemModal: FC<Props> = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const removeFromCart = useRemoveFromCart(props.userLoggedIn);
  const [item, setItem] = useInventoryItem(props.showRemoveItemModal);

  useEffect(() => {
    setItem(props.showRemoveItemModal);
  }, [props.showRemoveItemModal, setItem]);

  useEffect(() => {
    if (props.showRemoveItemModal) {
      const modal = ref.current!;
      modal.style.animationName = 'var(--remove-item-modal-show)';
      modal.style.display = 'block';
    }
  }, [props.showRemoveItemModal, ref]);

  const hideModal = () => {
    const modal = ref.current!;
    modal.style.animationName = 'var(--remove-item-modal-hide)';
  };

  const onAnimationEnd = async (): Promise<void> => {
    const modal = ref.current!;
    modal.style.animationName = '';

    if (modal.classList.contains('qbc-remove-item-modal-visible')) {
      modal.classList.remove('qbc-remove-item-modal-visible');
      modal.style.display = 'none';
      if (props.showRemoveItemModal) {
        props.setShowRemoveItemModal('');
      }
    } else {
      modal.classList.add('qbc-remove-item-modal-visible');
    }
  };

  return (
    <RemoveItemModalStyles ref={ref} onAnimationEnd={() => onAnimationEnd()}>
      <div className="modal-wrapper">
        {item ? (
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <span className="material-icons m-icon-36">delete</span>
              </div>
              <div className="clear-title">Remove Item</div>
            </div>
            <div className="modal-body">
              <div
                className="clear-img"
                style={{
                  backgroundImage: `url(${props.imagesStorageUrl}images/thumbnail/${item.id})`
                }}
              ></div>
              <span>
                Are you sure you want to remove {item.SalesDesc} from your cart?
              </span>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  hideModal();
                }}
                type="button"
                className="modal-footer-button button-red"
              >
                Yes, Remove This Item
              </button>
              <button
                type="button"
                className="modal-footer-button button-grey"
                onClick={hideModal}
              >
                No, Keep this Item
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-content"></div>
        )}
      </div>
      <div className="modal-backdrop"></div>
    </RemoveItemModalStyles>
  );
};

export default RemoveItemModal;
