import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CoreSetFormCategoriesComponent from '../../../../components/Analysis/Types/CoreSet/FormCategories';
import { Option } from '../../../../components/Select';
import { selectors } from '../../../../modules/analysis';
import { selectors as sharedSelectors } from '../../../../modules/shared';
import {
  loadCoreSet,
  loadCoreSets,
  updateFilledCoreSetDraft,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_CORESET_FORM_FILLING,
  ROUTE_ANALYSIS_CORESET_PATIENT,
} from '../../../../modules/analysis/constants';
import { ROUTE_ACCOUNT_MY_PLANS } from '../../../../modules/account/constants';
import { displayToast } from '../../../../modules/shared/actions';
import { Link } from '../../../../components/Typography';
import Flex from '../../../../components/Flex';
import { useIntl } from 'react-intl';
import { Dimmer, Loader } from 'semantic-ui-react';

const CoreSetFormCategoriesContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftPatientId = useSelector(selectors.draftPatientId);
  const draftCoreSetId = useSelector(selectors.draftCoreSetId);
  const coreSet = useSelector(selectors.coreSet);
  const coreSetReferences = useSelector(selectors.coreSetReferences);
  const isCoreSetReferencesLoading = useSelector(
    selectors.isCoreSetReferencesLoading
  );
  const didCoreSetReferencesError = useSelector(
    selectors.didCoreSetReferencesError
  );
  const isCoreSetLoading = useSelector(selectors.isCoreSetLoading);
  const didCoreSetError = useSelector(selectors.didCoreSetError);
  const plans = useSelector(sharedSelectors.plans);
  const plansWithoutAccess = useSelector(sharedSelectors.plansWithoutAccess);
  const [selectedCoreSet, setSelectedCoreSet] = useState<Option | null>(null);

  function onSearchChange(term: string) {
    // dispatch(
    //   loadCoreSets(term ? { filter: `description=%${term}%` } : undefined)
    // );
  }

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'analysis-coreset-patient-not-selected',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_CORESET_PATIENT);
      return;
    }
  }, [dispatch, draftPatientId, navigate]);

  useEffect(() => {
    if (coreSet && !selectedCoreSet) {
      setSelectedCoreSet({ key: coreSet.id, label: coreSet.description });
    }
  }, [coreSet, selectedCoreSet]);

  useEffect(() => {
    if (
      draftCoreSetId &&
      draftCoreSetId !== coreSet?.id &&
      !isCoreSetLoading &&
      !didCoreSetError
    ) {
      dispatch(loadCoreSet(draftCoreSetId));
    }

    if (
      !coreSetReferences &&
      !isCoreSetReferencesLoading &&
      !didCoreSetReferencesError
    ) {
      dispatch(loadCoreSets());
    }
  }, [
    dispatch,
    draftCoreSetId,
    coreSet,
    coreSetReferences,
    isCoreSetReferencesLoading,
    isCoreSetLoading,
    didCoreSetError,
    didCoreSetReferencesError,
  ]);

  if (
    !coreSetReferences ||
    isCoreSetReferencesLoading ||
    didCoreSetReferencesError ||
    isCoreSetLoading ||
    didCoreSetReferencesError
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  const coreSetOptions = plans
    .map((plan) =>
      coreSetReferences
        .filter((coreSetReference) => coreSetReference.planId === plan.id)
        .map((coreSetReference) => ({
          key: coreSetReference.id,
          label: coreSetReference.description,
          tag: plansWithoutAccess.find(
            (plan) => plan.id === coreSetReference.planId
          )?.description,
        }))
        .sort((oA, oB) =>
          oA.label > oB.label ? -1 : oA.label < oB.label ? 1 : 0
        )
    )
    .flat();

  function updateSelectedCoreSet(options: Option[]) {
    // we're only handling one selection, therefore this is valid:
    const [option] = options;

    if (option.tag) {
      dispatch(
        displayToast({
          id: 'analysis-coreset-out-of-plan',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.outsideYourPlan',
          timeout: 5e3,
          action: (
            <Flex align="center">
              <Link to={ROUTE_ACCOUNT_MY_PLANS}>
                {intl.formatMessage({ id: 'common.upgradePlan' })}
              </Link>
            </Flex>
          ),
        })
      );
      return;
    }

    setSelectedCoreSet(option);

    // update draft with setSelectedCoreSet.key
    dispatch(updateFilledCoreSetDraft({ coreSetId: option.key }));
  }

  function onNextClick() {
    if (selectedCoreSet) {
      // update draft with setSelectedCoreSet.key
      dispatch(updateFilledCoreSetDraft({ coreSetId: selectedCoreSet.key }));
      navigate(ROUTE_ANALYSIS_CORESET_FORM_FILLING);
    } else {
      dispatch(
        displayToast({
          id: 'analysis-coreset-coreset-not-selected',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.coreSet.coreSetNotSelected',
          timeout: 5e3,
        })
      );
    }
  }

  function onPreviousClick() {
    if (selectedCoreSet) {
      // update draft with setSelectedCoreSet.key
      dispatch(updateFilledCoreSetDraft({ coreSetId: selectedCoreSet.key }));
    }

    navigate(ROUTE_ANALYSIS_CORESET_PATIENT);
  }

  return (
    <CoreSetFormCategoriesComponent
      coreSetOptions={coreSetOptions}
      selectedCoreSet={selectedCoreSet || undefined}
      onSearchChange={onSearchChange}
      onCoreSetSelection={updateSelectedCoreSet}
      onPreviousClick={onPreviousClick}
      onNextClick={onNextClick}
    />
  );
};

export default CoreSetFormCategoriesContainer;
