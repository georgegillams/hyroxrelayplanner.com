const apiStructureWithDescriptionsExtensions = apiStructure => {
  // Team
  apiStructure.createTeam.description = 'Create a new team';
  apiStructure.createTeam.authorisation = 'None';
  apiStructure.loadTeam.description = 'Load an existing team';
  apiStructure.loadTeam.authorisation = 'None';
  apiStructure.updateTeam.description = 'Update an existing team via a webhook called by Typeform';
  apiStructure.updateTeam.authorisation = 'None';

  // Athlete
  apiStructure.updateAthlete.description = 'Create or update an athlete via a webhook called by Typeform';
  apiStructure.updateAthlete.authorisation = 'None';

  // Plan
  apiStructure.loadPlan.description = 'Returns the plan for a given team, recalculating it if necessary';
  apiStructure.loadPlan.authorisation = 'None';

  return apiStructure;
};

export default { apiStructureWithDescriptionsExtensions };
export { apiStructureWithDescriptionsExtensions };
