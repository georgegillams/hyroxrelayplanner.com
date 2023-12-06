// const { data } = require('./data');

import { SERVER_HYROX_EXERCISES as HYROX_EXERCISES } from 'server-utils/form-constants';

export const calculateHeuristicForPlan = (plan, athletes) => {
  let score = 0;
  for (let i = 0; i < plan.length; i += 1) {
    const planStep = plan[i];
    const athlete = athletes.find(a => a.id === planStep.athleteID);
    const athletePreferenceForActivity = athlete.preferences[planStep.activity];
    const scoreForAthleteMatch = 4 - athletePreferenceForActivity;
    score += scoreForAthleteMatch;

    const planStepBefore = plan[i - 1] || {};
    const planStep2Before = plan[i - 2] || {};
    let athleteRestedScore;
    if (planStepBefore.athleteID === planStep.athleteID) {
      athleteRestedScore = 0;
    } else if (planStep2Before.athleteID === planStep.athleteID) {
      athleteRestedScore = 2;
    } else {
      athleteRestedScore = 4;
    }
    score += athleteRestedScore;
  }
  return score;
};

const athleteActivityCount = (plan, athleteID) => {
  return plan.filter(step => step.athleteID === athleteID).length;
};

const createNextPlanStep = (currentPlanLength, athlete) => {
  return {
    athleteID: athlete.id,
    activity: HYROX_EXERCISES[currentPlanLength],
  };
};

export const calculateChildren = (currentPlan, athletes) => {
  const possibleNextAthletes = athletes.filter(a => athleteActivityCount(currentPlan, a.id) < 2);
  return possibleNextAthletes.map(a => {
    const updatedPlan = [...currentPlan, createNextPlanStep(currentPlan.length, a)];
    const isComplete = updatedPlan.length === HYROX_EXERCISES.length;
    return {
      plan: updatedPlan,
      isComplete,
      ...(isComplete && {
        heuristic: calculateHeuristicForPlan(updatedPlan, athletes),
      }),
    };
  });
};

export const calculatePlan = data => {
  const tree = {
    plan: [],
    isComplete: false,
  };

  const leavesToProcess = [tree];
  const possiblePlanNodes = [];

  while (leavesToProcess.length > 0) {
    const currentNode = leavesToProcess.pop();
    currentNode.children = calculateChildren(currentNode.plan, data.athletes);
    leavesToProcess.push(...currentNode.children);
    possiblePlanNodes.push(...currentNode.children.filter(n => n.isComplete));
  }

  const top3Plans = possiblePlanNodes.sort((a, b) => b.heuristic - a.heuristic).slice(0, 3);
  const topPlan = top3Plans[0];
  const topMax3Plans = top3Plans.filter(p => p.heuristic === topPlan.heuristic);

  return { plans: topMax3Plans };
};
