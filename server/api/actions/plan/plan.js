// const { data } = require('./data');

import { SERVER_HYROX_EXERCISES as HYROX_EXERCISES } from 'server-utils/form-constants';

const getPlanQualityFromHeuristic = heuristic => {
  // TODO Check this threshold
  if (heuristic > 100) {
    return 'great';
  }
  // TODO Check this threshold
  if (heuristic > 50) {
    return 'ok';
  }
  return 'poor';
};

const pluralise = (count, singular, plural) => {
  return count === 1 ? singular : plural;
};

const calculateNumberOfTopChoices = (plan, athletes) => {
  const result = [];
  for (let athlete of athletes) {
    const athleteTopChoiceScore = Math.max(...Object.values(athlete.preferences));
    const athleteActivities = plan.plan.filter(step => step.athleteID === athlete.id).map(a => a.activity);
    const athleteTopChoices = Object.entries(athlete.preferences)
      .filter(([, value]) => value > 4 && value === athleteTopChoiceScore)
      .map(([key]) => key);

    console.log(`athleteActivities`, athleteActivities);
    console.log(`athleteTopChoices`, athleteTopChoices);

    const numberOfTopChoiceMatches = athleteTopChoices.filter(topChoice =>
      athleteActivities.includes(topChoice)
    ).length;

    result.push(numberOfTopChoiceMatches);
  }

  return result;
};

export const calculatePlanBenefits = (plan, athletes) => {
  const qualityOfPlan = getPlanQualityFromHeuristic(plan.heuristic);
  let qualityStatement = `This plan is ${qualityOfPlan}`;

  const result = [];

  let skipRemainingTopChoiceStatements = false;
  const numberOfTopChoices = calculateNumberOfTopChoices(plan, athletes);
  const numDoingBothTopChoice = numberOfTopChoices.filter(n => n === 2).length;
  const numDoingOneTopChoice = numberOfTopChoices.filter(n => n === 1).length;

  result.push(
    `${numDoingBothTopChoice} ${pluralise(
      numDoingBothTopChoice,
      'athlete is',
      'athletes are'
    )} doing their favourite stations.`
  );
  if (numDoingBothTopChoice === 4) {
    skipRemainingTopChoiceStatements = true;
  }

  if (!skipRemainingTopChoiceStatements) {
    result.push(
      `${numDoingOneTopChoice} ${pluralise(
        numDoingOneTopChoice,
        'athlete is',
        'athletes are'
      )} doing one of their favourite stations.`
    );
  }

  let skipRemainingGapStatements = false;

  // calculate number of athletes with 4 gaps
  // push result if > 0, otherwise push "all athletes have a gap of 4"

  if (!skipRemainingGapStatements) {
    // calculate number of athletes with 3 gaps
    // push result if > 0, otherwise push "all athletes have a gap of 3"
  }

  if (!skipRemainingGapStatements) {
    // calculate number of athletes with 2 gaps
    // push result if > 0, otherwise push "all athletes have a gap of 2"
  }

  if (!skipRemainingGapStatements) {
    // calculate number of athletes going back-to-back
    // push result if > 0, otherwise push "No athletes go back to back"
  }

  return [qualityStatement, ...result];
};

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

  topMax3Plans.forEach(plan => {
    plan.explanation = calculatePlanBenefits(plan, data.athletes);
  });

  return { plans: topMax3Plans };
};
