// import 'checkout';
import AppShell from '@qbcart/eshop-app-shell';
import { html } from 'lit-temp';

// prettier-ignore
const actions = [
  {text: 'Home', icon: 'home', href: '/', activated: false, dataTarget: '', dataToggle: ''},
  {text: 'Contact', icon: 'info', href: '/contact', activated: false, dataTarget: '', dataToggle: ''},
  {text: 'Cart', icon: 'shopping_cart', href: '#', activated: false, dataTarget: '#qbc-eshop-cart-view-modal', dataToggle: 'modal'},
  {text: 'Checkout', icon: 'payment', href: '/checkout', activated: false, dataTarget: '', dataToggle: ''},
  {text: 'Login', icon: 'face', href: '/login', activated: false, dataTarget: '', dataToggle: ''}
];

document.open();
document.write(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AppShell({
    title: 'Home',
    appDrawerActions: actions,
    imagesStorageUrl:
      'https://qbcimages4e2rfby2glfmo.z13.web.core.windows.net/',
    siteUrl: '',
    siteName: 'Vector Tools',
    userLoggedIn: false,
    isB2C: false,
    syncInterval: 10000,
    meta: html`
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    `,
    styles: html`
      <link
        rel="stylesheet"
        data-preload="true"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        data-preload="true"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        data-preload="true"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://qbcdemo.z13.web.core.windows.net/eshop/app-shell/index.css"
      />
    `,
    scripts: html`
      <script
        type="module"
        integrity="sha384-ZsG+E+8Q6Yh0v98Nd0SfOT1bOX82TJaNaBS1npTZYuq4oD09c6rDD2R9pXqMvter"
        src="/_snowpack/hmr-client.js"
      ></script>
      <script
        type="module"
        integrity="sha384-LH/mFhEGRB4jHedP0nqOoIUwc4VX8eWJxEL+qTGWtroqiLJ2vxX169J0oSBMHL5o"
        src="/_snowpack/hmr-error-overlay.js"
      ></script>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
        defer
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"
        defer
      ></script>
      <script type="module" defer>
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/app-shell/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/sync-component/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/search-bar/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/toast/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/alert-modal/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/banner-carousel/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/product-slider/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/category-boxes/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/product-boxes/index.js';
        import 'https://qbcdemo.z13.web.core.windows.net/eshop/product-modal/index.js';
        import '/src/index.js';
      </script>
    `
  })
);
document.close();
