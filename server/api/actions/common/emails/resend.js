import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import { RESOURCE_NOT_FOUND } from '../../../../utils/common/errorConstants';
import { sendEmail } from 'server-utils/emails';
import { find } from 'server-utils/common/find';

export default async function resend(req) {
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }
  const emailData = await dbLoad({
    redisKey: 'emails',
  });
  const { existingValue: matchingEmail } = find(emailData, req.body.id);
  if (!matchingEmail) {
    throw RESOURCE_NOT_FOUND;
  }
  return await sendEmail(matchingEmail);
}
