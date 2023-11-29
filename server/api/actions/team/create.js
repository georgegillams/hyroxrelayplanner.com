import { dbCreate } from 'server-utils/common/database';
import reqSecure from 'server-utils/common/reqSecure';
import { v4 as uuidv4 } from 'uuid';

export default function query(req) {
  return (async () => {
    reqSecure(req, []);
    const newTeam = {
      teamId: uuidv4(),
    };
    return dbCreate({ redisKey: 'teams' }, { body: newTeam });
  })();
}
