import React from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'semantic-ui-react';
import styled, { createGlobalStyle } from 'styled-components';

import Flex from '../../Flex';
import FilledButton from '../../Button';
import { ValidationMessage, ExternalLink, H5, H6, H7 } from '../../Typography';
import RadioGroup, { IRadioGroupProps, Option } from '../../Shared/RadioGroup';

import { colors, grid } from '../../../config/theme';
import { themeGrid, themeProp } from '../../../utils/functional';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { Patients } from '../../../modules/patients/types';

export type Question = {
  parentKey: string;
  key: string;
  label: string;
} & Omit<IRadioGroupProps, 'onChange'>;

interface ISocialEconomicComponentProps {
  questions: Question[];
  socialEconomicValidationText: string;
  currentSocialEconomicLevel: Patients.SocialEconomicLevels | null;
  onQuestionAnswered: (parentKey: string, key: string, option: Option) => void;
}

const SocialEconomicComponent: React.FC<ISocialEconomicComponentProps> = ({
  questions,
  currentSocialEconomicLevel,
  socialEconomicValidationText,
  onQuestionAnswered,
}) => {
  const intl = useIntl();

  const closeModal = () =>
    document.getElementById('social-economic-form')?.parentElement?.click();

  return (
    <Modal
      id="social-economic-form"
      trigger={
        <span>
          <H6 style={{ marginBottom: grid(0.75) }}>
            {currentSocialEconomicLevel &&
              intl.formatMessage(
                {
                  id: 'patients.personalInfo.currentSocialEconomicLevel',
                },
                { level: currentSocialEconomicLevel }
              )}
          </H6>
          {intl.formatMessage(
            {
              id: 'patients.personalInfo.socialEconomicLevelPlaceholder',
            },
            {
              link: (
                <ExternalLink bold href="#social-economic-form">
                  {intl.formatMessage({
                    id: 'patients.personalInfo.socialEconomicLevelClickHere',
                  })}
                </ExternalLink>
              ),
            }
          )}
          <p>
            {!!socialEconomicValidationText && (
              <ValidationMessage
                bold
                style={{ color: colors.situational.danger }}
              >
                {socialEconomicValidationText}
              </ValidationMessage>
            )}
          </p>
        </span>
      }
    >
      <GlobalStyle />

      <Modal.Content>
        <Flex justify="space-between">
          <H5>
            {intl.formatMessage({
              id: 'patients.personalInfo.socialEconomicQuestions.title',
            })}
          </H5>
          <CloseIcon onClick={closeModal} />
        </Flex>
        {questions.map(({ parentKey, key, label, ...question }, i) => (
          <Flex key={key} direction="column">
            <span style={{ margin: `${grid(3)} 0` }}>
              <Tag style={{ marginRight: grid(1) }}>
                {`${i + 1}`.padStart(2, '0')}
              </Tag>
              <InlineH6 bold color="gray">
                {label}
              </InlineH6>
            </span>
            <RadioGroup
              prefix={parentKey + key}
              onChange={(option) => onQuestionAnswered(parentKey, key, option)}
              {...question}
            />
          </Flex>
        ))}
        <Flex justify="center">
          <FilledButton style={{ marginTop: grid(2) }} onClick={closeModal}>
            {intl.formatMessage({
              id: 'patients.personalInfo.submitSocialEconomicForm',
            })}
          </FilledButton>
        </Flex>
      </Modal.Content>
    </Modal>
  );
};

const InlineH6 = styled(H7).attrs({ as: 'span' })``;

const Tag = styled(H7).attrs({ as: 'span' })`
  background: ${themeProp('colors.situational.info')};
  border-radius: ${themeGrid(0.5)};
  padding: ${themeGrid(0.75)};
`;

const GlobalStyle = createGlobalStyle`
  .ui.page.modals {
    padding: 0;

    .ui.modal.visible {
      box-shadow: none;
      border-radius: 0;
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

export default SocialEconomicComponent;
