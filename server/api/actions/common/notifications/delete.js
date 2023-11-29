import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default async function remove(req) {
  reqSecure(req, notificationsAllowedAttributes);
  const user = await authentication(req);
  if (user && user.admin) {
    return await dbRemove({ redisKey: 'notifications' }, req);
  }
  throw UNAUTHORISED_WRITE;
}
