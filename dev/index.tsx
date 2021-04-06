import React from 'react';
import { render } from 'react-dom';
import '@qbcart/eshop-toast';
import '@qbcart/eshop-alert-modal';
import '@qbcart/eshop-product-modal';
import 'cart';

const CartTest = () => {
  return (
    <div className="m-5">
      <h3>Click for Product Modal</h3>
      <br />
      <button
        className="btn btn-outline-success mr-3"
        data-toggle="modal"
        data-target="#qbc-eshop-product-modal-view"
        data-id="ITEM-800010DA-1498678070"
      >
        <img
          src={`${
            document.getElementById('qbc-images').dataset.imagesStorageUrl
          }/images/thumbnail/ITEM-800010DA-1498678070`}
        />
      </button>
      <button
        className="btn btn-outline-success mr-3"
        data-toggle="modal"
        data-target="#qbc-eshop-product-modal-view"
        data-id="ITEM-8000099B-1382111330"
      >
        <img
          src={`${
            document.getElementById('qbc-images').dataset.imagesStorageUrl
          }/images/thumbnail/ITEM-8000099B-1382111330`}
        />
      </button>
      <button
        className="btn btn-outline-success mr-3"
        data-toggle="modal"
        data-target="#qbc-eshop-product-modal-view"
        data-id="ITEM-800009F4-1384978725"
      >
        <img
          src={`${
            document.getElementById('qbc-images').dataset.imagesStorageUrl
          }/images/thumbnail/ITEM-800009F4-1384978725`}
        />
      </button>
      <button
        className="btn btn-outline-success mr-3"
        data-toggle="modal"
        data-target="#qbc-eshop-product-modal-view"
        data-id="ITEM-60000-997203789"
      >
        <img
          src={`${
            document.getElementById('qbc-images').dataset.imagesStorageUrl
          }/images/thumbnail/ITEM-60000-997203789`}
        />
      </button>
      <button
        className="btn btn-outline-success mr-3"
        data-toggle="modal"
        data-target="#qbc-eshop-product-modal-view"
        data-id="ITEM-1E90000-1243542262"
      >
        <img
          src={`${
            document.getElementById('qbc-images').dataset.imagesStorageUrl
          }/images/thumbnail/ITEM-1E90000-1243542262`}
        />
      </button>
      <br />
      <button
        className="btn btn-outline-primary mt-3"
        data-toggle="modal"
        data-target="#qbc-eshop-cart-view-modal"
      >
        Show Cart
      </button>
    </div>
  );
};

(function () {
  render(<CartTest />, document.getElementById('cart-test'));
})();
