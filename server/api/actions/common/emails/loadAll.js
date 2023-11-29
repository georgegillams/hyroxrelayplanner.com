import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default async function loadAll(req) {
  let user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }
  const result = await dbLoad({
    redisKey: 'emails',
    includeDeleted: true,
  });
  return { emails: result.reverse() };
}
