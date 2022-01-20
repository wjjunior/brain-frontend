import { GlobalState } from '../';

import { focusedAccount } from '../account/selectors';

export const toasts = (state: GlobalState) => state.shared.toasts;
export const plans = (state: GlobalState) =>
  state.shared.plans.sort((pA, pB) => pA.value - pB.value);
export const plansWithAccess = (state: GlobalState) => {
  const allPlans = plans(state);
  const focusedPatient = focusedAccount(state);

  if (!focusedPatient) return [allPlans[0]];

  const currentPlanIndex =
    allPlans.findIndex((plan) => plan.id === focusedPatient.plan.id) || 0;

  return allPlans.slice(0, currentPlanIndex + 1);
};
export const plansWithoutAccess = (state: GlobalState) => {
  const allPlans = plans(state);
  const focusedPatient = focusedAccount(state);

  if (!focusedPatient) return allPlans.slice(1);

  const currentPlanIndex =
    allPlans.findIndex((plan) => plan.id === focusedPatient.plan.id) || 0;

  return allPlans.slice(currentPlanIndex + 1);
};
export const isPlansLoading = (state: GlobalState) =>
  state.shared.isPlansLoading;
export const didPlansError = (state: GlobalState) => state.shared.didPlansError;
