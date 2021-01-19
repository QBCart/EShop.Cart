import React from "react";
import { render } from "react-dom";
import  Cart from './cart';

render(<Cart />, document.getElementById('cart'));

$('#addToCartModal').on('shown.bs.modal', function (e) { 
    //@ts-ignore
    let trigger = $(e.relatedTarget);
    let modal = $(this);
    let item = trigger.data('item');;

    modal
      .find('#addToCartTrigger')
      .data('item', JSON.stringify(item))
      .end()
      .find('#item-name')
      .text(item.Name);
})