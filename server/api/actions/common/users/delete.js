import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { userOwnsResource } from 'server-utils/common/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default async function remove(req) {
  reqSecure(req, usersAllowedAttributes);
  const user = await authentication(req);
  const userOwnsResourceResult = await userOwnsResource('users', req.body.id, user);
  // Users should be able to delete their own user
  if (user && (user.admin || userOwnsResourceResult)) {
    return await dbRemove({ redisKey: 'users' }, req);
  }
  throw UNAUTHORISED_WRITE;
}
