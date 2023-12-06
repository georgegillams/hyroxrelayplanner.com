import { createRoutine } from 'redux-saga-routines';

import { LOAD_TEAM, LOAD_PLAN } from './constants';

export const loadTeam = createRoutine(LOAD_TEAM);
export const loadPlan = createRoutine(LOAD_PLAN);
