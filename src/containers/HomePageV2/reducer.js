import produce from 'immer';

import { createTeam } from './actions';

export const initialState = {
  teamId: null,
  creatingTeam: false,
  createTeamError: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case createTeam.REQUEST:
        draft.creatingTeam = true;
        draft.createTeamError = null;
        break;

      case createTeam.SUCCESS:
        draft.creatingTeam = false;
        draft.teamId = payload.teamId;
        break;

      case createTeam.FAILURE:
        draft.creatingTeam = false;
        draft.createTeamError = payload;
        break;
    }
  });

export default reducer;
