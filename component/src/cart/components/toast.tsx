/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 * This code can only be used and/or distributed with express permission.
 */

// React import is needed by snowpack even though typescript suggests otherwise
import React, {
    FC,
    forwardRef,
    useEffect
  } from 'https://cdn.skypack.dev/pin/react@v17.0.1-tOtrZxBRexARODgO0jli/min/react.js';
  
  interface Props {
    imagesStorageUrl: string;
  }
  
  const NetworkToast = forwardRef<HTMLDivElement, Props>((props, ref) => {
    useEffect(() => {
      $('#qbc-eshop-cart-toast').toast({
        delay: 3000
      });
    }, []);

    useEffect(() => {
        $('#qbc-eshop-cart-toast').on('hidden.bs.toast', function () {
            const toastBody = $('#qbc-eshop-cart-toast .toast-body');
            toastBody.text('');
            toastBody.removeClass(['text-success', 'text-danger']);
          })
      }, []);
  
    return (
      <div
        id="qbc-eshop-cart-toast-container"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div
          id="qbc-eshop-cart-toast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img
              src={`${props.imagesStorageUrl}images/favicon.ico`}
              alt="company logo"
              width="18"
            />
            <strong className="ml-1 mr-auto">Cart</strong>
            <small>Just now</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body" ref={ref}></div>
        </div>
      </div>
    );
  });
  
  export default NetworkToast;
  