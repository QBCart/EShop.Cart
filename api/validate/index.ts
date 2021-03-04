import type { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { User } from '@qbcart/types';
import type CartItems from '@qbcart/types/types/internals/cart-items';
import validateCartItems from './validateCartItems';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const isDevEnv = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development';
    const user: User = isDevEnv ? { oid: '1111' } : req.body?.user;
    const items: CartItems = isDevEnv
      ? req.body?.data || req.body
      : req.body?.data;
    const removedItems = await validateCartItems(items, user);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {
        items,
        removedItems
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error(error);
    context.res = {
      status: '500',
      body:
        'Our systems are having trouble validating your cart online. Please contact support.',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export default httpTrigger;
