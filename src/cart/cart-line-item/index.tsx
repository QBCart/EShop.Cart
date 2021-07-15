/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

// prettier-ignore
import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
// prettier-ignore
import { useUpdateCart, useRemoveCartViewModal, useReportSubtotal } from '@qbcart/eshop-cart-hooks';
// prettier-ignore
import { useInventoryItem, useCustomPricing } from '@qbcart/eshop-inventory-hooks';
import { toUSCurrency } from '@qbcart/utils';

import CartLineItemStyles from './style.js';
import NotAvailable from './not-available.js';

interface Props {
  id: string;
  quantity: number;
  imagesStorageUrl: string;
  userLoggedIn: boolean;
  setShowRemoveItemModal: Dispatch<SetStateAction<string>>;
  customPriceTextColor: string;
  onSalePriceTextColor: string;
}

const CartLineItem: FC<Props> = (props: Props) => {
  const reportSubtotal = useReportSubtotal();
  const removeCartViewModal = useRemoveCartViewModal();
  const [inputQuantity, setInputQuantity] = useState(props.quantity.toString());
  const [updateReady, setUpdateReady] = useState(false);
  const updateCart = useUpdateCart(props.userLoggedIn);

  const [item] = useInventoryItem(props.id);
  const [customPrice] = useCustomPricing(props.userLoggedIn, props.id);
  const price = item?.IsOnSale
    ? item.OnSalePrice
      ? customPrice && customPrice < item.OnSalePrice
        ? customPrice
        : item.OnSalePrice
      : customPrice
    : customPrice;
  const priceColor = item?.IsOnSale
    ? item.OnSalePrice
      ? customPrice && customPrice < item.OnSalePrice
        ? props.customPriceTextColor
        : props.onSalePriceTextColor
      : props.customPriceTextColor
    : props.customPriceTextColor;
  const subtotal = (price ?? item?.SalesPrice ?? 0) * props.quantity;

  useEffect(() => {
    console.log(`CartLineItem rendered: ${props.id}`);
  });

  useEffect(() => {
    if (item) {
      reportSubtotal(item.id, subtotal);
    }
  }, [subtotal]);

  useEffect(() => {
    setUpdateReady(inputQuantity !== props.quantity.toString());
  }, [inputQuantity, props.quantity]);

  useEffect(() => {
    setInputQuantity(props.quantity.toString());
  }, [props.quantity]);

  const updateItemQuantity = async () => {
    setUpdateReady(!(await updateCart(props.id, price ?? 0, inputQuantity)));
  };

  const navigate = async (href: string) => {
    await removeCartViewModal();
    window.location.assign(href);
  };

  return item ? (
    <CartLineItemStyles>
      <div
        className="cart-row-img"
        style={{
          backgroundImage: `url(${props.imagesStorageUrl}images/thumbnail/${props.id})`
        }}
      ></div>
      <div className="cart-row-data">
        <div className="cart-row-top-data">
          <div className="cart-row-item-description truncate-overflow">
            {item.SalesDesc}
          </div>
          <div className="cart-row-item-sku">SKU: {item.Name}</div>
          <div className="cart-row-item-price">
            Price:
            <div className={`retail-price ${price ? 'price-slash' : ''}`}>
              {toUSCurrency(item.SalesPrice)}
            </div>
            {price ? (
              <div
                className="product-price"
                style={{
                  color: price ? priceColor : 'black'
                }}
              >
                {toUSCurrency(price)}
              </div>
            ) : null}
          </div>
          <div className="cart-row-item-quantity">
            <label>Quantity: </label>
            <input
              onChange={(e) => setInputQuantity(e.target.value)}
              value={inputQuantity}
              type="number"
              min="1"
              className="quantity-input-cart"
            ></input>
            {updateReady ? (
              <button
                className="cart-quantity-update"
                onClick={updateItemQuantity}
              >
                update
              </button>
            ) : null}
          </div>
          <div className="cart-row-item-total">
            Subtotal:
            <span>
              {toUSCurrency((price ?? item.SalesPrice) * props.quantity)} (
              {props.quantity} item
              {props.quantity > 1 ? 's' : ''})
            </span>
          </div>
        </div>
        <div className="cart-row-bottom-buttons">
          <button
            type="button"
            className="cart-modal-button button-blue"
            onClick={() => navigate(item.Href)}
          >
            <span className="material-icons">open_in_new</span>
          </button>
          <button
            type="button"
            className="cart-modal-button button-red"
            onClick={() => props.setShowRemoveItemModal(props.id)}
          >
            <span className="material-icons">delete</span>
          </button>
        </div>
      </div>
    </CartLineItemStyles>
  ) : (
    <NotAvailable
      imagesStorageUrl={props.imagesStorageUrl}
      id={props.id}
      userLoggedIn={props.userLoggedIn}
    />
  );
};

export default CartLineItem;
