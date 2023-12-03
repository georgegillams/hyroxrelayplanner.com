const apiStructureWithActionsExtensions = apiStructure => {
  // Team
  apiStructure.createTeam.action = require('./team/create');
  apiStructure.loadTeam.action = require('./team/load');
  apiStructure.updateTeam.action = require('./team/update-tf-webhook');

  // Athlete
  apiStructure.updateAthlete.action = require('./athlete/update-tf-webhook');

  // Plan
  apiStructure.loadPlan.action = require('./plan/load');

  return apiStructure;
};

export default { apiStructureWithActionsExtensions };
export { apiStructureWithActionsExtensions };
