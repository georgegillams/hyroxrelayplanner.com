import loadAllValues from './private/loadAllValues';

import redis from 'server-utils/common/redis';
import { find } from 'server-utils/common/find';
import appConfig from 'helpers/appConfig';

const idForNewEntity = async (redisKey, requestedId) => {
  const existingData = await loadAllValues(redisKey);
  if (requestedId) {
    const { existingValue: entityWithSameId } = find(existingData, requestedId);
    if (!entityWithSameId) {
      return requestedId;
    }
  }
  return Math.random().toString(36).substring(7);
};

export default async function dbCreate(settings, req) {
  const newValue = req.body;
  const { requestedId } = newValue;

  const newId = await idForNewEntity(settings.redisKey, requestedId);
  newValue.id = newId;
  newValue.timestamp = Date.now();
  newValue.lastUpdatedTimestamp = newValue.timestamp;
  newValue.authorId = settings.user ? settings.user.id : undefined;
  // Write to redis:
  await redis.rpush([`${appConfig.projectName}_${settings.redisKey}`, JSON.stringify(newValue)]);
  return newValue;
}
