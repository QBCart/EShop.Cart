import type { AzureFunction, Context, HttpRequest } from "@azure/functions"
import type { User } from '@qbcart/types'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const user: User = req.body?.user;
        if (user) {
          context.res = {
            // status: 200, /* Defaults to 200 */
            body: null,
            headers: {
              'Content-Type': 'application/json'
            }
          };
        } else {
          context.res = {
            status: '401',
            body: 'Error: Unauthorized.',
            headers: {
              'Content-Type': 'application/json'
            }
          };
        }
      } catch (error) {
        console.error(error);
        context.res = {
          status: '500',
          body:
            'Contact Support: The Search API seems to be having internal issues.',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
};

export default httpTrigger;