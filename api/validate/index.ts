import type { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { User } from '@qbcart/types';
import validateCart from '../shared/validateCart';
import validateCustomerPricing from '../shared/validateCustomerPricing';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const user: User = req.body?.user;
    //! TEMPORARY DEV ENVIRONMENT SWITCH - REMOVE BEFORE RELEASE//
    const cart: any = req.body?.data || req.body;
    await validateCart(cart);
    if (user) {
      await validateCustomerPricing(cart);
    }
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: cart,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error(error);
    context.res = {
      status: '500',
      body: 'Contact Support: The Cart API seems to be having internal issues.',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export default httpTrigger;
