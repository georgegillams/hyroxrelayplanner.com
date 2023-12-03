import { dbLoadSingle, dbUpdate } from 'server-utils/common/database';
import { findAnswerWithBlockRef, hiddenFieldFromForm } from 'server-utils/typeform-webhooks';

export default async function updateTeam(req) {
  // reqSecure(req, []);
  const teamId = hiddenFieldFromForm(req.body, 'teamid');
  const teamNameAnswer = findAnswerWithBlockRef(req.body, 'team-name');
  const teamName = teamNameAnswer.text;
  const team = await dbLoadSingle({
    redisKey: 'teams',
    filter: ar => ar.teamId === teamId,
  });
  team.teamName = teamName;
  await dbUpdate({ redisKey: 'teams' }, { body: team });
  return { team };
}
