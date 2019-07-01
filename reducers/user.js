import { SET_USER, RESET_USER } from '../constants/auth';

const initialState = {
  userId: null,
  firstName: '',
  lastName: '',
  planType: '',
  emailAddress: '',
  stripeChargeId: '',
  jwt: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.userNumber,
        firstName: action.firstName,
        lastName: action.lastName,
        planType: action.planType,
        emailAddress: action.emailAddress,
        jwt: action.jwt,
        stripeChargeId: action.stripeChargeId,
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};
