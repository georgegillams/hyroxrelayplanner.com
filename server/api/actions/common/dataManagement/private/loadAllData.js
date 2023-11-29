import { dbLoad } from 'server-utils/common/database';
import { REDIS_INFORMATION_STORES } from './redisStores';

/**
 * Loads all data from key redis stores and compiles it into a single object
 * @returns {promise} A promise that resolves the data
 */

export default async function loadAllData() {
  const data = {};
  for (let redisKey of REDIS_INFORMATION_STORES) {
    data[redisKey] = await dbLoad({ redisKey, includeDeleted: true });
  }
  return data;
}
