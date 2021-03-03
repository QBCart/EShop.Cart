import type { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { User } from '@qbcart/types';
import cosmos from '../shared/cosmos';
import validateCart from '../shared/validateCart';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const isDevEnv = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development';
    const user: User = isDevEnv ? { oid: '1111' } : req.body?.user;
    if (user) {
      const cart = await cosmos.customers.getEshopCart(
        `ESHOP-CART-${user.oid}`
      );
      if (cart) {
        await validateCart(cart);
        context.res = {
          // status: 200, /* Defaults to 200 */
          //
          body: {
            items: cart.items,
            lastUpdated: cart.lastUpdated
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };
      } else {
        context.res = {
          status: '404',
          body: 'No Cart Found',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
    } else {
      context.res = {
        status: '401',
        body: 'Cart Get API Error: Unauthorized.',
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
  } catch (error) {
    console.error(error);
    context.res = {
      status: '500',
      body: 'Cart Get API Error: Internal Server Issues.',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export default httpTrigger;
