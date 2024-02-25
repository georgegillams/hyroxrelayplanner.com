import { dbCreate } from 'server-utils/common/database';
import reqSecure from 'server-utils/common/reqSecure';
import { v4 as uuidv4 } from 'uuid';

export default function query(req) {
  const isDev = process.env.NODE_ENV === 'development';
  return (async () => {
    reqSecure(req, []);
    const athletes = await Promise.all(
      [...Array(4)].map((_, index) => {
        return dbCreate({ redisKey: 'athletes' }, { body: { requestedId: `athlete-${index + 1}` } });
      })
    );
    const newTeamId = isDev && req.body.requestedId ? req.body.requestedId : uuidv4();
    const newTeam = {
      teamId: newTeamId,
      athleteIds: athletes.map(a => a.id),
    };
    return await dbCreate({ redisKey: 'teams' }, { body: newTeam });
  })();
}
