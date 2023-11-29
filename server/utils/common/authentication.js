import safeCompare from 'safe-compare';

import { find } from './find';

import { dbLoad } from 'server-utils/common/database';
import { SESSION_COOKIE_KEY } from '@george-gillams/webapp/helpers/storageConstants';

const secretApiKey = process.env.SECRET_API_KEY;

export default async function authentication(req) {
  const sessionKey = req.cookies[SESSION_COOKIE_KEY];
  const apiKey = req.headers.apikey;
  // important to use `safeCompare` here to prevent
  // a timing attack to discover the key
  if (apiKey && safeCompare(apiKey, secretApiKey)) {
    return {
      id: 'direct_API_invocator',
      admin: true,
      uname: 'direct_API_invocation',
    };
  }
  if (!sessionKey) {
    return null;
  }

  const users = await dbLoad({ redisKey: 'users' });
  const sessions = await dbLoad({ redisKey: 'sessions' });

  // `find` uses `safeCompare` so it is safe to use for authentication
  const { existingValue: userSession } = find(sessions, sessionKey, 'sessionKey');
  if (userSession && userSession.expiry && userSession.expiry >= Date.now()) {
    const { existingValue: userProfile } = find(users, userSession.userId);
    if (userProfile) {
      return userProfile;
    }
    return null;
  }

  return null;
}
