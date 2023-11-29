import { dbLoad } from 'server-utils/common/database';
import { STRING_REGEX, ID_REGEX } from '@george-gillams/webapp/helpers/regexConstants';
import appConfig from 'helpers/appConfig';
import { RESOURCE_NOT_FOUND, UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { AuthError } from 'server-utils/common/errors';
import redis from 'server-utils/common/redis';
import { find } from 'server-utils/common/find';
import authentication from 'server-utils/common/authentication';
import setContentLastUpdatedTimestamp from 'server-utils/common/setContentLastUpdatedTimestamp';
import reqSecure from 'server-utils/common/reqSecure';
import logger from 'server-utils/common/logger';

const deleteEntityAllowedAttributes = [
  { attribute: 'collectionName', pattern: STRING_REGEX },
  { attribute: 'id', pattern: ID_REGEX },
];

export default async function deleteEntity(req) {
  reqSecure(req, deleteEntityAllowedAttributes);
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_WRITE;
  }
  const { collectionName, id: idToDelete } = req.body;
  const collectionData = await dbLoad({
    redisKey: collectionName,
    includeDeleted: true,
  });
  const { existingValue, existingValueIndex } = find(collectionData, idToDelete);
  if (!existingValue) {
    throw RESOURCE_NOT_FOUND;
  }
  if (!existingValue.deleted) {
    throw new AuthError('Only deleted entities can be permanently removed.');
  }
  logger.log(`Permanently removing ${existingValue.id} at index ${existingValueIndex}`);
  await redis.lrem(`${appConfig.projectName}_${collectionName}`, 1, JSON.stringify(existingValue));
  await setContentLastUpdatedTimestamp();
  return true;
}
