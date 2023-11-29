import loginUser from '../auth/private/login';

import magicLinksAllowedAttributes from './private/magicLinksAllowedAttributes';

import { dbLoad, dbUpdate } from 'server-utils/common/database';
import { InvalidInputError } from 'server-utils/common/errors';
import lockPromise from 'server-utils/common/lock';
import { find } from 'server-utils/common/find';
import reqSecure from 'server-utils/common/reqSecure';

export default function loginMagicLink(req) {
  reqSecure(req, magicLinksAllowedAttributes);
  const { magicLinkKey } = req.body;
  return lockPromise('magiclinks', async () => {
    const magicLinkData = await dbLoad({ redisKey: 'magiclinks' });
    const userData = await dbLoad({ redisKey: 'users' });
    // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
    const { existingValue: magicLink } = find(magicLinkData, magicLinkKey, 'key');
    if (!magicLink) {
      throw new InvalidInputError('Invalid magic link');
    }
    const { existingValue: matchingUser } = find(userData, magicLink.userId);
    if (!matchingUser) {
      throw new InvalidInputError('The user who requested this magic link could not be found');
    }
    if (Date.now() < new Date(magicLink.expiry).getTime()) {
      // invalidate magic link (set expiry to 0)
      magicLink.expiry = 0;
      await dbUpdate({ redisKey: 'magiclinks' }, { body: magicLink });
    } else {
      throw new InvalidInputError('Magic link has expired');
    }
    const sessionKey = await loginUser(matchingUser);
    return {
      ...matchingUser,
      session: sessionKey,
    };
  });
}
