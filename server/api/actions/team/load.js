import { dbLoadSingle } from 'server-utils/common/database';
import reqSecure from 'server-utils/common/reqSecure';

export default async function load(req, params) {
  reqSecure(req, []);
  return await dbLoadSingle({
    redisKey: 'teams',
    filter: ar => ar.teamId === params.teamId,
  });
}
