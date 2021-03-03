import type { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { User } from '@qbcart/types';
import type { EShopCart } from '@qbcart/types/eshop';
import cosmos from '../shared/cosmos';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const isDevEnv = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development';
    const user: User = isDevEnv ? { oid: '1111' } : req.body?.user;
    if (user) {
      const cart: EShopCart = isDevEnv
        ? req.body?.data || req.body
        : req.body?.data;
      cart.id = `ESHOP-CART-${user.oid}`;
      if (await cosmos.customers.upsertEshopCart(cart)) {
        context.res = {
          // status: 200, /* Defaults to 200 */
          //
          body: {},
          headers: {
            'Content-Type': 'application/json'
          }
        };
      } else {
        context.res = {
          status: '417',
          body: 'Cart Update API Error: Failed To Update.',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
    } else {
      context.res = {
        status: '401',
        body: 'Cart Update API Error: Unauthorized.',
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
  } catch (error) {
    console.error(error);
    context.res = {
      status: '500',
      body: 'Cart Update API Error: Internal Server Issues.',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export default httpTrigger;
