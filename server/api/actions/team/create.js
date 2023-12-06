import { dbCreate } from 'server-utils/common/database';
import reqSecure from 'server-utils/common/reqSecure';
import { v4 as uuidv4 } from 'uuid';

export default function query(req) {
  return (async () => {
    reqSecure(req, []);
    const athletes = await Promise.all(
      [...Array(4)].map(() => {
        return dbCreate({ redisKey: 'athletes' }, { body: {} });
      })
    );
    const newTeam = {
      teamId: uuidv4(),
      athleteIds: athletes.map(a => a.id),
    };
    return await dbCreate({ redisKey: 'teams' }, { body: newTeam });
  })();
}
