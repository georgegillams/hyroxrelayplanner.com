import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbLoadSingle } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default async function loadSingle(req, params) {
  reqSecure(req, notificationsAllowedAttributes);
  const user = await authentication(req);
  return await dbLoadSingle({
    redisKey: 'notifications',
    includeDeleted: user && user.admin,
    filter: ar => ar.id === params.id,
  });
}
