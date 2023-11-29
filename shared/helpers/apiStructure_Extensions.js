const GET = 'GET';
const POST = 'POST';

const apiStructureExtensions = {
  // Team
  createTeam: { method: POST, path: '/team/create' },
  loadTeam: { method: GET, path: '/team/load/:teamId' },
  updateTeam: { method: POST, path: '/team/update/tf-webhook' },

  // Athlete
  updateAthlete: { method: POST, path: '/athlete/update/tf-webhook' },

  // Plan
  loadPlan: { method: GET, path: '/plan/load' },
};

export default { apiStructureExtensions };
export { apiStructureExtensions };
