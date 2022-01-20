import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { subDays, format } from 'date-fns';

import InternalError from '../../components/Errors/InternalError';
import DashboardHomeComponent from '../../components/Dashboard/Home';
import { actions, selectors } from '../../modules/dashboard';
import { selectors as accountSelectors } from '../../modules/account';
import { AGE_RANGES } from '../../modules/patients/constants';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function DashboardHomeContainer() {
  const intl = useIntl();

  const [dateRange, setDateRange] = useState(
    format(subDays(new Date(), 7), 'yyyy-MM-dd')
  );
  const [dateRangeSelectedOption, setDateRangeSelectedOption] = useState({
    key: '7',
    label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 7 }),
  });

  const focusedAccount = useSelector(accountSelectors.focusedAccount);

  const dispatch = useDispatch();
  const dashboardSummary = useSelector(selectors.dashboardSummary);
  const isDashboardLoading = useSelector(selectors.isDashboardLoading);
  const didDashboardError = useSelector(selectors.didDashboardError);

  useEffect(() => {
    dispatch(actions.loadDashboardRequest(dateRange));
  }, [dispatch, dateRange]);

  const dateRangeOptions = [
    {
      key: '7',
      label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 7 }),
    },
    {
      key: '14',
      label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 14 }),
    },
    {
      key: '28',
      label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 28 }),
    },
  ];

  if (!dashboardSummary || isDashboardLoading) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  if (didDashboardError && !isDashboardLoading) {
    return <InternalError />;
  }

  const genderSummary = {
    total: dashboardSummary.genderSummary.attendances,
    male: {
      total: dashboardSummary.genderSummary.maleTotal,
      percentage: dashboardSummary.genderSummary.malePercentage,
      label: intl.formatMessage({ id: 'dashboard.maleLabel' }),
    },
    female: {
      total: dashboardSummary.genderSummary.femaleTotal,
      percentage: dashboardSummary.genderSummary.femalePercentage,
      label: intl.formatMessage({ id: 'dashboard.femaleLabel' }),
    },
  };

  const goalsSummary = {
    total: dashboardSummary.goalsSummary.goalsTotal,
    achieved: {
      total: dashboardSummary.goalsSummary.goalsAchievedTotal,
      percentage: dashboardSummary.goalsSummary.goalsAchievedPercentage,
      label: intl.formatMessage({ id: 'dashboard.achievedGoalsLabel' }),
    },
    unachieved: {
      total:
        dashboardSummary.goalsSummary.goalsNotMetTotal +
        dashboardSummary.goalsSummary.goalsInProgressTotal,
      percentage: dashboardSummary.goalsSummary.goalsTotal
        ? Math.floor(
            ((dashboardSummary.goalsSummary.goalsNotMetTotal +
              dashboardSummary.goalsSummary.goalsInProgressTotal) /
              dashboardSummary.goalsSummary.goalsTotal) *
              100
          )
        : 0,
      label: intl.formatMessage({ id: 'dashboard.unachievedGoalsLabel' }),
    },
  };

  const fullName = focusedAccount
    ? focusedAccount.name + ' ' + focusedAccount.lastName
    : '';

  const onDateRangeSelect = (days: string) => {
    setDateRange(format(subDays(new Date(), parseInt(days)), 'yyyy-MM-dd'));
    setDateRangeSelectedOption({
      key: days,
      label: intl.formatMessage(
        { id: 'dashboard.lastXDays' },
        { days: parseInt(days) }
      ),
    });
  };

  let ageRange = AGE_RANGES.CHILDREN;

  function getAgeGroup(age: number): string {
    if (age <= AGE_RANGES.CHILDREN[1]) {
      ageRange = AGE_RANGES.CHILDREN;
      return 'common.ageRanges.children';
    }

    if (age >= AGE_RANGES.ELDER[0]) {
      ageRange = AGE_RANGES.ELDER;
      return 'common.ageRanges.elder';
    }

    if (age >= AGE_RANGES.YOUNG[0] && age <= AGE_RANGES.YOUNG[1]) {
      ageRange = AGE_RANGES.YOUNG;
      return 'common.ageRanges.young';
    }

    if (age >= AGE_RANGES.ADULT[0] && age <= AGE_RANGES.ADULT[1]) {
      ageRange = AGE_RANGES.ADULT;
      return 'common.ageRanges.adult';
    }

    return '';
  }

  return (
    <DashboardHomeComponent
      fullName={fullName}
      dateRangeSelectedOption={dateRangeSelectedOption}
      dateRangeOptions={dateRangeOptions}
      icdRankPlacements={dashboardSummary.topIcdSummary}
      latestAnalysis={dashboardSummary.topDiagnosticSummary} //Falta patient_id na response
      latestGoals={dashboardSummary.topGoalsSummary} //Falta patiend_id na response
      goalsSummary={goalsSummary}
      compromisedCategories={dashboardSummary.topCoreSetCategoriesSummary}
      coreSetRankPlacements={dashboardSummary.topCoreSetsSummary}
      genderSummary={genderSummary}
      mostCommonAgeGroup={getAgeGroup(dashboardSummary.ageRange)}
      ageRange={ageRange}
      totalAnalysis={dashboardSummary.diagnosticsTotal}
      totalPatients={dashboardSummary.patientsTotal}
      onDateRangeSelect={onDateRangeSelect}
    />
  );
}
