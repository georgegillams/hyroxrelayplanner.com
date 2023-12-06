import { dbLoadSingle } from 'server-utils/common/database';
import reqSecure from 'server-utils/common/reqSecure';

export default async function load(req, params) {
  reqSecure(req, []);
  const team = await dbLoadSingle({
    redisKey: 'teams',
    filter: ar => ar.teamId === params.teamId,
  });
  if (Array.isArray(team?.athleteIds)) {
    const athletes = await Promise.all(
      team.athleteIds.map(athleteId => dbLoadSingle({ redisKey: 'athletes', filter: ar => ar.id === athleteId })) || []
    );
    team.athletes = athletes;
  }
  return { team };
}
