import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import { generateKey } from 'server-utils/common/hash';
import setContentLastUpdatedTimestamp from 'server-utils/common/setContentLastUpdatedTimestamp';
import { COOKIE_EXPIRY_TIME } from '@george-gillams/webapp/helpers/storageConstants';

/**
 * Creates a new session and assigns the user to it
 * @param {object} userProfile The user to assign to the new session
 * @returns {promise} A promise that resolves the new session's sessionKey
 */
export default function login(userProfile) {
  return lockPromise('sessions', async () => {
    const session = {};
    session.sessionKey = generateKey();
    session.expiry = Date.now() + COOKIE_EXPIRY_TIME;
    session.userId = userProfile.id;
    session.userAuthenticatedTimestamp = Date.now();

    await dbCreate({ redisKey: 'sessions' }, { body: session });
    await setContentLastUpdatedTimestamp();

    return session.sessionKey;
  });
}
