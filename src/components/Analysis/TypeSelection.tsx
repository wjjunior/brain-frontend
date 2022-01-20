import React from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'semantic-ui-react';
import styled, { createGlobalStyle } from 'styled-components';

import Card from '../Card';
import Flex from '../Flex';
import Separator from '../Separator';
import { H5, Link } from '../Typography';

import { grid } from '../../config/theme';
import { themeProp } from '../../utils/functional';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import {
  ROUTE_ANALYSIS_CREATE_CORESET,
  ROUTE_ANALYSIS_CREATE_GLOBAL_PROGNOSTIC,
  // ROUTE_ANALYSIS_CREATE_HEALTH_IMPACT,
  ROUTE_ANALYSIS_CREATE_NEUROPSICHOLOGICAL_PROFILE,
  ROUTE_ANALYSIS_CREATE_PROSPECTIVE_RESULT_MAP,
} from '../../modules/analysis/constants';
import Checkbox from '../Checkbox';

interface ITypeSelectionComponentProps {
  patientId?: string;
  trigger: React.ReactNode;
}

const TypeSelectionComponent: React.FC<ITypeSelectionComponentProps> = ({
  patientId,
  trigger,
}) => {
  const intl = useIntl();

  const patientQs = patientId ? `?patientId=${patientId}` : '';

  const closeModal = () =>
    document.getElementById('analysis-type-selection')?.parentElement?.click();

  return (
    <Modal id="analysis-type-selection" size="mini" trigger={trigger}>
      <GlobalStyle />

      <Modal.Content>
        <Flex justify="space-between">
          <H5>
            {intl.formatMessage({
              id: 'analysis.typeSelectionTitle',
            })}
          </H5>
          <CloseIcon onClick={closeModal} />
        </Flex>
        <Separator margin="3 0 2" />
        <Link to={ROUTE_ANALYSIS_CREATE_CORESET + patientQs}>
          <ClickableCard>
            {intl.formatMessage({ id: 'common.analysis.coreSet' })}
            <Checkbox />
          </ClickableCard>
        </Link>
        <Link to={ROUTE_ANALYSIS_CREATE_PROSPECTIVE_RESULT_MAP + patientQs}>
          <ClickableCard>
            {intl.formatMessage({ id: 'common.analysis.prospectiveResultMap' })}
            <Checkbox />
          </ClickableCard>
        </Link>
        <Link to={ROUTE_ANALYSIS_CREATE_GLOBAL_PROGNOSTIC + patientQs}>
          <ClickableCard>
            {intl.formatMessage({ id: 'common.analysis.globalPrognostic' })}
            <Checkbox />
          </ClickableCard>
        </Link>
        <Link to={ROUTE_ANALYSIS_CREATE_NEUROPSICHOLOGICAL_PROFILE + patientQs}>
          <ClickableCard>
            {intl.formatMessage({
              id: 'common.analysis.neuropsichologicalProfile',
            })}
            <Checkbox />
          </ClickableCard>
        </Link>
        {/* <Link to={ROUTE_ANALYSIS_CREATE_HEALTH_IMPACT + patientQs}>
          <ClickableCard>
            {intl.formatMessage({
              id: 'common.analysis.healthImpact',
            })}
            <Checkbox />
          </ClickableCard>
        </Link> */}
        {/* <ClickableCard>
          {intl.formatMessage({ id: 'common.analysis.interventionGoals' })}
          <Checkbox />
        </ClickableCard> */}
      </Modal.Content>
    </Modal>
  );
};

const ClickableCard = styled(Card).attrs({
  direction: 'row',
  justify: 'space-between',
})`
  cursor: pointer;
  font-size: ${grid(1.75)};
  margin-bottom: ${grid(2)};
  color: ${themeProp('colors.primary.dark_blue')};
`;

const GlobalStyle = createGlobalStyle`
  .ui.page.modals {
    padding: 0;

    .ui.modal.visible {
      box-shadow: none;
      border-radius: ${grid(0.5)};
      margin: 0;

      svg {
        cursor: pointer;

        path {
          fill: ${themeProp('colors.primary.dark_blue')};
        }
      }
    }
  }
`;

export default TypeSelectionComponent;
