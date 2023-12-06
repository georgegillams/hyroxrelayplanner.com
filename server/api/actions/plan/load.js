import { dbLoadSingle } from 'server-utils/common/database';
import reqSecure from 'server-utils/common/reqSecure';
import { calculatePlan } from './plan';

const formatPreferences = preferences => {
  if (!preferences) {
    return null;
  }

  let minScore = 10;
  let maxScore = 0;
  for (let key of Object.keys(preferences)) {
    minScore = Math.min(minScore, preferences[key]);
    maxScore = Math.max(maxScore, preferences[key]);
  }
  const scoreRange = maxScore - minScore;
  const hasRange = scoreRange > 0;

  const normalisedPreferences = {};
  for (let key of Object.keys(preferences)) {
    let normalisedScore = 0;
    if (hasRange) {
      const score = preferences[key];
      const scoreAboveMinScore = score - minScore;
      normalisedScore = (10 * scoreAboveMinScore) / scoreRange;
    }
    normalisedPreferences[key] = normalisedScore;
  }

  return normalisedPreferences;
};

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

  if (team.athletes.some(a => !a.name || !a.preferences)) {
    return { plan: null, planStatus: 'cannot-be-calculated' };
  }

  // Calculate preferences checksum...
  // Look up to see if plans are already calculated and return from DB if they are...

  const planInputData = {
    athletes: team.athletes.map(a => ({
      id: a.id,
      name: a.name,
      preferences: formatPreferences(a.preferences),
    })),
  };

  const { plans } = calculatePlan(planInputData);

  // ... and then continue from here...

  const plansWithNames = plans.map(plan => ({
    ...plan,
    plan: plan.plan.map(step => ({
      ...step,
      athleteName: team.athletes.find(a => a.id === step.athleteID).name,
    })),
  }));

  return { plans: plansWithNames };
}
