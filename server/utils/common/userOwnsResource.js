import { find } from './find';

import { dbLoad } from 'server-utils/common/database';

const determineIfUserOwnsResource = async (redisKey, resourceId, user) => {
  const data = await dbLoad({ redisKey });
  const { existingValue } = find(data, resourceId);
  if (existingValue) {
    return existingValue.authorId === user.id;
  }
  return false;
};

const userOwnsResource = async (redisKey, resourceId, user) => {
  if (!user) {
    return false;
  }

  // Users should be honorary owners of themselves:
  if (redisKey === 'users' && resourceId === user.id) {
    return true;
  }

  return await determineIfUserOwnsResource(redisKey, resourceId, user);
};

export default userOwnsResource;
export { userOwnsResource };
