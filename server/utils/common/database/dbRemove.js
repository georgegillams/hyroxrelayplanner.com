import loadAllValues from './private/loadAllValues';
import dbUpdate from './dbUpdate';

import { RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';
import { find } from 'server-utils/common/find';

export default async function dbRemove(settings, req) {
  const data = await loadAllValues(settings.redisKey);
  const { existingValue } = find(data, req.body.id);

  if (!existingValue) {
    throw RESOURCE_NOT_FOUND;
  }

  const value = JSON.parse(JSON.stringify(existingValue));
  value.deleted = true;

  return await dbUpdate(settings, { body: value });
}
