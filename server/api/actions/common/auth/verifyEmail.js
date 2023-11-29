import { dbLoad, dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import { find } from 'server-utils/common/find';
import { AuthError } from 'server-utils/common/errors';

export default function verifyEmail(req) {
  return lockPromise('emailVerificationCodes', async () => {
    const { verificationKey } = req.body;
    let emailVerificationData = await dbLoad({ redisKey: 'emailVerificationCodes' });
    const { existingValue: emailVerification } = find(emailVerificationData, verificationKey, 'key');
    if (emailVerification) {
      if (Date.now() < new Date(emailVerification.expiry).getTime()) {
        // invalidate magic link (set expiry to 0)
        emailVerification.expiry = 0;
        await dbUpdate({ redisKey: 'emailVerificationCodes' }, { body: emailVerification });
      } else {
        throw new AuthError('Email verification link has expired');
      }
    } else {
      throw new AuthError('Invalid verification link');
    }
    const userData = await dbLoad({ redisKey: 'users' });
    const { existingValue: user } = find(userData, emailVerification.userId);
    if (user) {
      user.emailVerified = true;
      await dbUpdate({ redisKey: 'users' }, { body: user });
    } else {
      throw new AuthError('Invalid user');
    }

    return { success: 'Email verified' };
  });
}
