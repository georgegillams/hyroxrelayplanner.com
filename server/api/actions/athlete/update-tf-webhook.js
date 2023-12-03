import { dbLoadSingle, dbUpdate } from 'server-utils/common/database';
import { AuthError } from 'server-utils/common/errors';
import { findAnswerWithBlockRef, hiddenFieldFromForm } from 'server-utils/typeform-webhooks';
import { SERVER_HYROX_EXERCISES as HYROX_EXERCISES } from 'server-utils/form-constants';

export default async function updateTeam(req) {
  // reqSecure(req, []);
  const teamId = hiddenFieldFromForm(req.body, 'teamid');
  const athleteId = hiddenFieldFromForm(req.body, 'athleteid');
  const team = await dbLoadSingle({
    redisKey: 'teams',
    filter: ar => ar.teamId === teamId,
  });
  const athlete = await dbLoadSingle({
    redisKey: 'athletes',
    filter: ar => ar.id === athleteId,
  });

  if (!team.athleteIds.includes(athleteId)) {
    throw new AuthError('Athlete does not belong to team.');
  }

  const athleteNameAnswer = findAnswerWithBlockRef(req.body, 'athlete-name');
  const preferencesAnswers = HYROX_EXERCISES.map(exercise => findAnswerWithBlockRef(req.body, exercise));

  const athleteName = athleteNameAnswer.text;
  const preferences = {};
  preferencesAnswers.forEach((answer, index) => (preferences[HYROX_EXERCISES[index]] = answer.number));

  athlete.name = athleteName;
  athlete.preferences = preferences;

  await dbUpdate({ redisKey: 'athletes' }, { body: athlete });
  return { athlete };
}
