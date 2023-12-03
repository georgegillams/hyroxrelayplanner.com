export const findAnswerWithBlockRef = (body, blockRef) => {
  const formDefinition = body.form_response.definition;
  const answers = body.form_response.answers;
  const block = formDefinition.fields.find(f => f?.ref === blockRef);
  const answer = answers.find(a => a.field?.id === block?.id);
  return answer;
};

export const hiddenFieldFromForm = (body, hiddenFieldName) => {
  return body.form_response.hidden[hiddenFieldName];
};
