import * as React from './skypack';
import { render } from './skypack';
import { useAddToCart, useInventoryItem } from '@qbcart/eshop-local-db';
import mountCart from '../src/index';
// import { mountToast, showToast } from '@qbcart/toast';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import mountProductModal from '@qbcart/eshop-product-modal';

// mountToast();
// mountProductModal();
mountCart(null);

const AddToCartTest = () => {
  const [item, changeItem] = useInventoryItem('');
  const addToCart = useAddToCart(true);
  return (
    <div>
      <h2>
        Demonstrates getting a single item and adding an item to cart, such as
        Product Modal would do...
      </h2>
      <h3>{item?.SalesDesc ?? 'Choose an item'}</h3>

      <select onChange={(e) => changeItem(e.currentTarget.value)}>
        <option value="">none</option>
        <option value="ITEM-1730000-1233151611">XBSCL</option>
        <option value="ITEM-80000246-1264797877">XBSTL</option>
        <option value="ITEM-60000-997203789">VTB600</option>
      </select>
      <button
        onClick={async () => {
          if (item) {
            const res = await addToCart(item.id, item.SalesPrice, 3);
            alert(res ?? 'Added to cart!');
          }
        }}
      >
        Add Selection To Cart
      </button>
    </div>
  );
};

render(<AddToCartTest />, document.getElementById('add-to-cart-test'));
