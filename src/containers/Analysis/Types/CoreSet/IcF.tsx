import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CoreSetIcFComponent from '../../../../components/Analysis/Types/CoreSet/IcF';
import { Option as RadioOption } from '../../../../components/Shared/RadioGroup';
import { Option as CheckboxOption } from '../../../../components/Shared/CheckboxGroup';
import { actions, selectors } from '../../../../modules/analysis';
import { ActionPayloads } from '../../../../modules/analysis/types';
import { answerFilledCoreSetDraft } from '../../../../modules/analysis/actions';
import { debounce } from '../../../../utils/functional';

interface ICoreSetIcFContainerProps {
  icFId: string;
  categoryId: string;
}

const CoreSetIcFContainer: React.FC<ICoreSetIcFContainerProps> = ({
  icFId,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const icF = useSelector(selectors.coreSetIcFById(categoryId, icFId));
  const draftIcF = useSelector(selectors.draftCoreSetIcfById(icFId));

  if (!icF) return null;

  function onIcFAnswered(option: RadioOption, code: string) {
    dispatch(
      actions.answerFilledCoreSetDraft({
        icfId: icFId,
        code,
        answerId: option.key,
      })
    );
  }

  const dispatchAnswerFilledCoreSetDraft = debounce(
    (draft: ActionPayloads.AnswerFilledCoreSetDraft) =>
      dispatch(answerFilledCoreSetDraft(draft)),
    25
  );

  const onDescriptionChange = function onDescriptionChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatchAnswerFilledCoreSetDraft({
      icfId: icFId,
      description: e.target.value,
    });
  };

  function onInformationSourceSelected(options: CheckboxOption[]) {
    dispatch(
      actions.answerFilledCoreSetDraft({
        icfId: icFId,
        informationSourceIds: options.map((option) => option.key),
      })
    );
  }

  return (
    <CoreSetIcFComponent
      {...{
        icF,
        draftIcF,
        onIcFAnswered,
        onDescriptionChange,
        onInformationSourceSelected,
      }}
    />
  );
};

export default CoreSetIcFContainer;
