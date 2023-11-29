import sendMagicLinkEmail from './private/sendMagicLinkEmail';
import magicLinksAllowedAttributes from './private/magicLinksAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { find } from 'server-utils/common/find';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default async function getmagiclink(req) {
  reqSecure(req, magicLinksAllowedAttributes);
  const authenticatedUser = await authentication(req);
  const userData = await dbLoad({ redisKey: 'users' });
  const { existingValue: userProfile } = find(userData, req.body.email.toLowerCase(), 'email');
  if (!userProfile) {
    throw new NotFoundError("We couldn't find a profile matching that email");
  }
  const { divertToAdmin } = req.body;
  if (divertToAdmin && (!authenticatedUser || !authenticatedUser.admin)) {
    throw new AuthError('Only an admin user can request a login link for another user');
  }
  // Sent emails should be stored in a DB so that we can verify this has been called:
  await sendMagicLinkEmail(userProfile, divertToAdmin, req.body.loginRedirect);
  return { success: 'A magic link has been generated and sent to the email associated with your account' };
}
