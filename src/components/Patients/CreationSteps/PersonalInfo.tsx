import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../Card';
import Flex from '../../Flex';
import { H6, Label } from '../../Typography';
import { OutlineButton } from '../../Button';
import TextField, { ITextFieldProps } from '../../TextField';
import SelectField, { ISelectFieldProps } from '../../SelectField';

import { grid } from '../../../config/theme';
import SocialEconomicContainer from '../../../containers/Patients/CreationSteps/SocialEconomic';
import DatePicker, { DatePickerInput } from '../../DatePicker';
import { Patients } from '../../../modules/patients/types';

export type Field = {
  ref?: React.RefObject<any>;
  visible?: boolean;
  selectProps?: ISelectFieldProps;
} & ITextFieldProps;

interface IPersonalInfoComponentProps {
  fields: Field[][];
  fullNameField: Field;
  idDocumentTypeField: Field;
  idDocumentNumberField: Field;
  educationLevelField: Field;
  professionField: Field;
  selectedAgeRange?: string;
  birthDate?: Date;
  birthDateValidationText: string;
  onDateSelected: (dateObj: Date) => void;
  currentSocialEconomicLevel: Patients.SocialEconomicLevels | null;
  disableEdit: boolean;
  onNextClick: () => void;
  onEnableEditClick: () => void;
}

const PersonalInfoComponent: React.FC<IPersonalInfoComponentProps> = ({
  fields,
  fullNameField,
  idDocumentTypeField,
  idDocumentNumberField,
  educationLevelField,
  professionField,
  selectedAgeRange,
  birthDate,
  birthDateValidationText,
  currentSocialEconomicLevel,
  disableEdit,
  onDateSelected,
  onNextClick,
  onEnableEditClick,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <H6 bold>{intl.formatMessage({ id: 'patients.personalInfoTitle' })}</H6>
        {disableEdit ? (
          <OutlineButton size="small" onClick={onEnableEditClick}>
            {intl.formatMessage({ id: 'common.enableEdit' })}
          </OutlineButton>
        ) : (
          <OutlineButton size="small" onClick={onNextClick}>
            {intl.formatMessage({ id: 'common.nextStep' })}
          </OutlineButton>
        )}
      </Flex>
      <Flex style={{ marginTop: grid(2) }}>
        <TextField
          flex="1"
          style={{ marginRight: grid(4) }}
          {...fullNameField}
          readOnly={disableEdit}
          disabled={disableEdit}
        />
        {!!idDocumentTypeField.selectProps && (
          <SelectField
            flex="1"
            style={{ marginRight: grid(4) }}
            disabled={disableEdit}
            {...idDocumentTypeField.selectProps}
            id={idDocumentTypeField.id}
          />
        )}
      </Flex>
      <Flex style={{ marginTop: grid(2) }}>
        <Flex flex="1" style={{ marginRight: grid(4) }}>
          <TextField
            flex="1"
            {...idDocumentNumberField}
            readOnly={disableEdit}
            disabled={disableEdit}
          />
        </Flex>
        <Flex flex="1" style={{ marginRight: grid(4) }}>
          {disableEdit ? (
            <Flex flex="1" direction="column">
              <Label color="gray">
                {intl.formatMessage({
                  id: 'patients.personalInfo.birthDateLabel',
                })}
                *
              </Label>
              <TextField
                id="birthdate"
                flex="1"
                style={{ marginTop: grid(1.5) }}
                value={intl.formatDate(birthDate)}
                disabled={disableEdit}
                readOnly={true}
              />
            </Flex>
          ) : (
            <DatePicker
              maxDate={new Date()}
              dateFormat="d/m/Y"
              value={birthDate?.toISOString()}
              onChange={(dateArr) => onDateSelected(dateArr[0])}
              style={{ width: '100%' }}
            >
              <DatePickerInput
                id="date-picker-calendar-id"
                type="text"
                readOnly
                invalid={!!birthDateValidationText}
                invalidText={birthDateValidationText}
                labelText={intl.formatMessage({
                  id: 'patients.personalInfo.birthDateLabel',
                })}
                placeholder={intl.formatMessage({
                  id: 'patients.personalInfo.birthDatePlaceholder',
                })}
              />
            </DatePicker>
          )}
        </Flex>
      </Flex>
      <Flex style={{ marginTop: grid(2) }}>
        <Flex flex="1" style={{ marginRight: grid(4) }}>
          <TextField
            disabled
            flex="1"
            id="age-range"
            type="text"
            autoComplete="off"
            value={
              selectedAgeRange
                ? intl.formatMessage({ id: selectedAgeRange })
                : ''
            }
            labelText={intl.formatMessage({
              id: 'patients.personalInfo.ageRangeLabel',
            })}
            placeholder={intl.formatMessage({
              id: 'patients.personalInfo.ageRangePlaceholder',
            })}
          />
        </Flex>
        <Flex flex="1" style={{ marginRight: grid(4) }}>
          {!!educationLevelField.selectProps && (
            <SelectField
              flex="1"
              disabled={disableEdit}
              {...educationLevelField.selectProps}
              id={educationLevelField.id}
            />
          )}
        </Flex>
      </Flex>
      <Flex style={{ marginTop: grid(2) }}>
        <TextField
          flex="1"
          style={{ marginRight: grid(4) }}
          {...professionField}
          readOnly={disableEdit}
          disabled={disableEdit}
        />
        <Flex flex="1" direction="column">
          <Label color="gray">
            {intl.formatMessage({
              id: 'patients.personalInfo.socialEconomicLevelLabel',
            })}
          </Label>
          <H6 style={{ marginTop: grid(2) }}>
            {disableEdit ? (
              <H6 style={{ marginBottom: grid(0.75) }}>
                {currentSocialEconomicLevel &&
                  intl.formatMessage(
                    {
                      id: 'patients.personalInfo.currentSocialEconomicLevel',
                    },
                    { level: currentSocialEconomicLevel }
                  )}
              </H6>
            ) : (
              <SocialEconomicContainer />
            )}
          </H6>
        </Flex>
      </Flex>
      {fields.map((subfields, i) => (
        <Flex key={i} style={{ marginTop: grid(2) }}>
          {subfields.map(({ id, selectProps, ...subField }) => {
            const sharedProps = {
              id,
              key: id,
              flex: '1',
              style: { marginRight: grid(4) },
              disabled: disableEdit,
            };

            if (selectProps) {
              return <SelectField {...sharedProps} {...selectProps} />;
            }

            return <TextField {...sharedProps} {...subField} />;
          })}
        </Flex>
      ))}
    </Card>
  );
};

export default PersonalInfoComponent;
