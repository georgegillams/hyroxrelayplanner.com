import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default async function load(req) {
  reqSecure(req, usersAllowedAttributes);
  const user = await authentication(req);
  if (user && user.admin) {
    const users = await dbLoad({ includeDeleted: true, redisKey: 'users' });
    return { users };
  }
  throw UNAUTHORISED_READ;
}
