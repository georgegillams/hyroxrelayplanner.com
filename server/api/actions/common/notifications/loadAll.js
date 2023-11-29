import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default async function loadAll(req) {
  reqSecure(req, notificationsAllowedAttributes);
  const user = await authentication(req);
  const notifications = await dbLoad({
    redisKey: 'notifications',
    includeDeleted: user && user.admin,
  });
  return { notifications };
}
