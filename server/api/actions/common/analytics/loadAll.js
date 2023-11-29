import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default async function loadAll(req) {
  reqSecure(req, analyticsAllowedAttributes);
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }
  const analytics = await dbLoad({
    redisKey: 'analytics',
    includeOwnerUname: true,
    includeDeleted: true,
  });
  return { analytics };
}
