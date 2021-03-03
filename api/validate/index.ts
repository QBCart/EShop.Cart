import type { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { User } from '@qbcart/types';
import type { EShopCart } from '@qbcart/types/eshop';
import validateCart from '../shared/validateCart';
import validateCustomerPricing from '../shared/validateCustomerPricing';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const isDevEnv = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development';
    const user: User = isDevEnv ? { oid: '1111' } : req.body?.user;
    const cart: EShopCart = isDevEnv ? req.body?.data || req.body : req.body?.data;
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
      body: 'Cart Validate API Error: Internal Server Issues.',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export default httpTrigger;
