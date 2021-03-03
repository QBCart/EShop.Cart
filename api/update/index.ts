import type { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { User } from '@qbcart/types';
import cosmos from '../shared/cosmos';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const isDevEnv = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development';
    const user: User = isDevEnv ? { oid: '1111' } : req.body?.user;
    if (user) {
      const cart: any = isDevEnv ? req.body?.data || req.body : req.body?.data;
      // TODO: update backend cart
      cosmos.customers.container.items.upsert({
        id: `ESHOP-CART-${user.oid}`,
        Discriminator: 'EShopCart',
        Items: cart.items,
        LastUpdated: cart.lastUpdated
      });
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
        status: '401',
        body: 'Cart API Error: Unauthorized.',
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
