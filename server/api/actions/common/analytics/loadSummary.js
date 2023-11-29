import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';
import processAnalytics from './private/processAnalytics';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default async function loadSummary(req) {
  reqSecure(req, analyticsAllowedAttributes);
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }
  const data = await dbLoad({
    redisKey: 'analytics',
    includeOwnerUname: true,
    includeDeleted: true,
  });
  const bags = processAnalytics(data);
  const sortedBags = bags.sort((a, b) => b.count - a.count);
  return { analytics: sortedBags };
}
