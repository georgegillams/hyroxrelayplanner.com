import produce from 'immer';

import { loadPlan, loadTeam } from './actions';

export const initialState = {
  teamId: null,
  team: null,
  loadingTeam: false,
  loadTeamError: null,

  plans: null,
  loadingPlan: false,
  loadPlanError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case loadTeam.TRIGGER:
        draft.teamId = payload;
        break;

      case loadTeam.REQUEST:
        draft.loadingTeam = true;
        draft.loadTeamError = null;
        break;

      case loadTeam.SUCCESS:
        draft.loadingTeam = false;
        draft.team = payload.team;
        break;

      case loadTeam.FAILURE:
        draft.loadingTeam = false;
        draft.loadTeamError = payload;
        break;

      case loadPlan.TRIGGER:
        draft.teamId = payload;
        break;

      case loadPlan.REQUEST:
        draft.loadingPlan = true;
        draft.loadPlanError = null;
        break;

      case loadPlan.SUCCESS:
        draft.loadingPlan = false;
        draft.plans = payload.plans;
        break;

      case loadPlan.FAILURE:
        draft.loadingPlan = false;
        draft.loadPlanError = payload;
        break;
    }
  });

export default reducer;
