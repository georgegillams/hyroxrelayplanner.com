import sendEmailVerificationEmail from './private/sendEmailVerificationEmail';
import authAllowedAttributes from './private/authAllowedAttributes';

import reqSecure from 'server-utils/common/reqSecure';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import authentication from 'server-utils/common/authentication';

export default async function requestVerificationEmail(req) {
  reqSecure(req, authAllowedAttributes);
  let user = await authentication(req);
  if (user) {
    await sendEmailVerificationEmail(user);
  } else {
    throw UNAUTHORISED_WRITE;
  }
  return { success: 'Verification email resent' };
}
