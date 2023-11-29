import { dbLoadSingle, dbUpdate } from 'server-utils/common/database';

const findAnswerWithBlockRef = (body, blockRef) => {
  const formDefinition = body.form_response.definition;
  const answers = body.form_response.answers;
  const block = formDefinition.fields.find(f => f?.ref === blockRef);
  const answer = answers.find(a => a.field?.id === block?.id);
  return answer;
};

const hiddenFieldFromForm = (body, hiddenFieldName) => {
  return body.form_response.hidden[hiddenFieldName];
};

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
