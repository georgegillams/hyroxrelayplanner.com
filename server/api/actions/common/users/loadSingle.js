import { dbLoadSingle } from 'server-utils/common/database';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default async function loadSingle(req) {
  reqSecure(req, []);
  const user = await authentication(req);
  if (user && user.admin) {
    return await dbLoadSingle({
      redisKey: 'users',
      filter: ar => ar.id === req.query.id,
    });
  }
  throw UNAUTHORISED_READ;
}
