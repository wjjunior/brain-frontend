import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';

import Card from '../../Card';
import Flex from '../../Flex';
import { H6, Label } from '../../Typography';
import FilledButton, { OutlineButton } from '../../Button';
import TextField, { ITextFieldProps } from '../../TextField';
import SelectField, { ISelectFieldProps } from '../../SelectField';

import { grid } from '../../../config/theme';
import { ROUTE_PATIENTS_EDIT_PERSONAL_INFO } from '../../../modules/patients/constants';
import DatePicker, { DatePickerInput } from '../../DatePicker';
import { Option } from '../../Shared/RadioGroup';
import PaginatedSelection from '../../Shared/PaginatedSelection';
import TextArea from '../../TextArea';
import { debounce } from '../../../utils/functional';

export type Field = {
  ref?: React.RefObject<any>;
  visible?: boolean;
  selectProps?: ISelectFieldProps;
} & ITextFieldProps;

interface IClinicalInfoComponentProps {
  clinicalInfoFields: Field[][];
  clinicalHistoryFields: Field[][];
  manualPreferenceField: Field;
  caseHistoryField: Field;
  selectedCaseHistory: Option | null;
  occurrenceStart?: Date;
  onDateSelected: (dateObj: Date) => void;
  onSubmit: () => void;
  disableEdit: boolean;
  onEnableEditClick: () => void;
  activeIcdPage: number;
  totalIcdPages: number;
  onIcdPageChange: (page: number) => void;
  icdPageItems: { key: string; label: string }[];
  selectedIcds: string[];
  onSelectedIcdsChange: (selectedIcds: string[]) => void;
  isIcdReferencesLoading: boolean;
  onIcdSearchChange: (searchFilter: string) => void;
}

const ClinicalInfoComponent: React.FC<IClinicalInfoComponentProps> = ({
  clinicalInfoFields,
  clinicalHistoryFields,
  manualPreferenceField,
  occurrenceStart,
  disableEdit,
  caseHistoryField,
  selectedCaseHistory,
  onDateSelected,
  onSubmit,
  onEnableEditClick,
  activeIcdPage,
  totalIcdPages,
  onIcdPageChange,
  icdPageItems,
  selectedIcds,
  onSelectedIcdsChange,
  isIcdReferencesLoading,
  onIcdSearchChange,
}) => {
  const intl = useIntl();
  const { id: patientId } = useParams();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <H6 bold>{intl.formatMessage({ id: 'patients.clinicalInfoTitle' })}</H6>
        <Flex>
          <Link
            to={ROUTE_PATIENTS_EDIT_PERSONAL_INFO.replace(
              ':verb',
              'edit'
            ).replace(':id', patientId)}
          >
            <OutlineButton size="small" style={{ marginRight: grid(1) }}>
              {intl.formatMessage({ id: 'common.previousStep' })}
            </OutlineButton>
          </Link>
          {disableEdit ? (
            <OutlineButton size="small" onClick={onEnableEditClick}>
              {intl.formatMessage({ id: 'common.enableEdit' })}
            </OutlineButton>
          ) : (
            <FilledButton size="small" type="submit" onClick={onSubmit}>
              {intl.formatMessage({ id: 'common.saveRecord' })}
            </FilledButton>
          )}
        </Flex>
      </Flex>
      <Flex style={{ marginTop: grid(2) }}>
        {!!manualPreferenceField.selectProps && (
          <SelectField
            {...manualPreferenceField.selectProps}
            flex="1"
            style={{ marginRight: grid(4) }}
            disabled={disableEdit}
          />
        )}
        <PaginatedSelection
          activePage={activeIcdPage}
          totalPages={totalIcdPages}
          pageItems={icdPageItems}
          onPageChange={onIcdPageChange}
          selectedItems={selectedIcds}
          isLoading={isIcdReferencesLoading}
          onSelectedItemsChange={onSelectedIcdsChange}
          onSearchFilterChange={debounce(onIcdSearchChange, 500)}
          trigger={
            <TextField
              id="icd-codes"
              readOnly
              flex="1"
              style={{ marginRight: grid(4) }}
              disabled={disableEdit}
              value={
                selectedIcds.length
                  ? intl.formatMessage(
                      {
                        id: 'common.selectedItems',
                      },
                      { number: selectedIcds.length }
                    )
                  : ''
              }
              placeholder={intl.formatMessage({
                id: 'patients.clinicalInfo.icdCodesPlaceholder',
              })}
              labelText={intl.formatMessage({
                id: 'patients.clinicalInfo.icdCodesLabel',
              })}
            />
          }
        />
      </Flex>
      {clinicalInfoFields.slice(1).map((subfields, index) => (
        <Flex key={index} style={{ marginTop: grid(2) }}>
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

            return <TextArea {...sharedProps} {...subField} />;
          })}
        </Flex>
      ))}
      <H6 bold style={{ marginTop: grid(3), marginBottom: grid(2) }}>
        {intl.formatMessage({ id: 'patients.clinicalInfoTitle' })}
      </H6>
      <Flex>
        <Flex flex="1" style={{ marginRight: grid(4) }}>
          {!!caseHistoryField.selectProps && (
            <SelectField
              {...caseHistoryField.selectProps}
              flex="1"
              disabled={disableEdit}
            />
          )}
        </Flex>
        <Flex flex="1" style={{ marginRight: grid(4) }}>
          {disableEdit ? (
            <Flex flex="1" direction="column">
              <Label color="gray">
                {intl.formatMessage({
                  id: 'patients.clinicalInfo.encephalicInjuryDateLabel',
                })}
                *
              </Label>
              <TextField
                id="birthdate"
                flex="1"
                style={{ marginTop: grid(1.5) }}
                value={
                  selectedCaseHistory
                    ? intl.formatDate(occurrenceStart)
                    : undefined
                }
                placeholder={intl.formatMessage({
                  id: 'patients.clinicalInfo.encephalicInjuryDatePlaceholder',
                })}
                disabled={disableEdit}
                readOnly={true}
              />
            </Flex>
          ) : (
            <DatePicker
              maxDate={new Date()}
              dateFormat="d/m/Y"
              value={
                selectedCaseHistory ? occurrenceStart?.toISOString() : undefined
              }
              onChange={(dateArr) => onDateSelected(dateArr[0])}
              style={{ width: '100%' }}
            >
              <DatePickerInput
                id="date-picker-calendar-id"
                type="text"
                readOnly
                invalid={
                  selectedCaseHistory
                    ? !occurrenceStart || isNaN(+occurrenceStart)
                    : false
                }
                disabled={!selectedCaseHistory}
                invalidText={intl.formatMessage({
                  id: 'patients.dateRangeInvalid',
                })}
                labelText={intl.formatMessage({
                  id: 'patients.clinicalInfo.encephalicInjuryDateLabel',
                })}
                placeholder={intl.formatMessage({
                  id: 'patients.clinicalInfo.encephalicInjuryDatePlaceholder',
                })}
              />
            </DatePicker>
          )}
        </Flex>
      </Flex>
      {clinicalHistoryFields.map((subfields, index) => (
        <Flex key={index} style={{ marginTop: grid(2) }}>
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

            return <TextArea {...sharedProps} {...subField} />;
          })}
        </Flex>
      ))}
    </Card>
  );
};

export default ClinicalInfoComponent;
