/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 * This code can only be used and/or distributed with express permission.
 */

 import { Cosmos } from '@qbcart/cosmos';

 const cosmos = new Cosmos(
   process.env.cosmosConnectionString!,
   process.env.cosmosDatabase!,
   process.env.cosmosInfoContainer!,
   process.env.cosmosItemsContainer!,
   process.env.cosmosCustomersContainer!
 );
 
 export default cosmos;