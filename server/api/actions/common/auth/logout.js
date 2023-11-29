import authAllowedAttributes from './private/authAllowedAttributes';
import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';

import { dbLoad, dbUpdate } from 'server-utils/common/database';
import { INVALID_SESSION } from 'server-utils/common/errorConstants';
import lockPromise from 'server-utils/common/lock';
import { find } from 'server-utils/common/find';
import setContentLastUpdatedTimestamp from 'server-utils/common/setContentLastUpdatedTimestamp';
import reqSecure from 'server-utils/common/reqSecure';

export default function logout(req) {
  reqSecure(req, authAllowedAttributes);
  return lockPromise('sessions', async () => {
    let sessionData = await dbLoad({ redisKey: 'sessions' });
    const { existingValue: session } = find(sessionData, req.cookies[SESSION_COOKIE_KEY], 'sessionKey');
    if (session) {
      session.userId = null;
      session.userAuthenticatedTimestamp = null;
      await dbUpdate({ redisKey: 'sessions' }, { body: session });
    } else {
      throw INVALID_SESSION;
    }
    await setContentLastUpdatedTimestamp();
    return { success: 'You are now logged out' };
  });
}
