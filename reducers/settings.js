import {
  PAUSE_PLAN_RESPONSE,
  ADD_TEAM_MEMBER_RESPONSE,
} from '../constants/user';
import { RESET_PASSWORD_RESPONSE } from '../constants/auth';

const initialState = {
  accSettings: {
    email: 'useremail@mail.com',
    accType: 'Accountant Manager',
    status: 'Active',
  },
  currentPlan: {
    planType: 'Self-Employed Plan',
    expirationDate: '6/18/19',
    price: 350,
    status: 'active',
  },
  teamMembers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_RESPONSE:
      return {
        ...state,
        accSettings: {
          email: 'useremail@mail.com',
          accType: 'Accountant Manager',
          status: 'inactive',
        },
      };
    case PAUSE_PLAN_RESPONSE:
      return {
        ...state,
        currentPlan: {
          planType: 'Self-Employed Plan',
          expirationDate: '6/18/19',
          price: 350,
          status: 'inactive',
        },
      };
    case ADD_TEAM_MEMBER_RESPONSE:
      return {
        ...state,
        teamMembers: state.teamMembers.concat([action.payload]),
      };
    default:
      return state;
  }
};
