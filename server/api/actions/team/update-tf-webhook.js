import { dbLoadSingle, dbUpdate } from 'server-utils/common/database';
import { InvalidInputError } from 'server-utils/common/errors';
import { EXAMPLE_TEAM_ID } from 'server-utils/form-constants';
import { findAnswerWithBlockRef, hiddenFieldFromForm } from 'server-utils/typeform-webhooks';

export default async function updateTeam(req) {
  // reqSecure(req, []);
  const teamId = hiddenFieldFromForm(req.body, 'teamid');
  if (teamId === EXAMPLE_TEAM_ID) {
    throw new InvalidInputError('This is an example team, and cannot be updated.');
  }
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
