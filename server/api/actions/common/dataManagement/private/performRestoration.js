import appConfig from 'helpers/appConfig';
import redis from 'server-utils/common/redis';

/**
 * Overwrites all redis data stores with the data values provided
 * @param {object} data The data object to perform the restoration from
 * @returns {null} none
 */

export default async function performRestoration(data) {
  for (let key of Object.keys(data)) {
    await redis.del(`${appConfig.projectName}_${key}`);
    if (data[key].length > 0) {
      const newData = data[key].map(d => JSON.stringify(d));
      await redis.rpush([`${appConfig.projectName}_${key}`, ...newData]);
    }
  }
  return true;
}
