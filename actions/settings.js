import {
  PAUSE_PLAN,
  PAUSE_PLAN_RESPONSE,
  ADD_TEAM_MEMBER,
  ADD_TEAM_MEMBER_RESPONSE,
} from '../constants/user';

export const pauseSubscription = () => ({
  type: PAUSE_PLAN,
});

export const pauseSubscriptionResponse = () => ({
  type: PAUSE_PLAN_RESPONSE,
});

export const addTeamMember = data => ({
  type: ADD_TEAM_MEMBER,
  payload: data,
});

export const addTeamMemberResponse = data => ({
  type: ADD_TEAM_MEMBER_RESPONSE,
  payload: data,
});
