import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import { ipPrefix } from 'server-utils/common/ipAddress';

export default function create(req) {
  reqSecure(req, analyticsAllowedAttributes);
  return lockPromise('analytics', async () => {
    const user = await authentication(req);
    let ipAddress = req.connection.remoteAddress;
    if (req.headers['x-forwarded-for']) {
      ipAddress = req.headers['x-forwarded-for'];
    }
    if (ipAddress) {
      req.body.ipAddressPrefix = ipPrefix(ipAddress);
    }
    return await dbCreate({ redisKey: 'analytics', user }, req);
  });
}
