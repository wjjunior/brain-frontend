import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import Tooltip from '../../../Tooltip';
import { H6, H8 } from '../../../Typography';
import { OutlineButton } from '../../../Button';
import { grid } from '../../../../config/theme';
import CoreSetCategoryLabel from '../../Shared/CoreSetCategoryLabel';
import SelectField from '../../../SelectField';
import TextField from '../../../TextField';
import { Option } from '../../../Select';

import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import { Analysis } from '../../../../modules/analysis/types';
import DatePicker, { DatePickerInput } from '../../../DatePicker';
import TextArea from '../../../TextArea';

interface INeuropsichologicalProfileAdditionalInformationComponentProps {
  medicationOptions: Option[];
  drugUsageOptions: Option[];
  drugFrequencyOptions: Option[];
  selectedMedication: Option[][];
  selectedDrugUsage: Option[];
  selectedDrugFrequency: Option[];
  medicationDosages: string[];
  draftAdditionalInfo: Analysis.NeuropsichologicalProfileAdditionalInfo;
  onTextFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onMedicationSelect: (options: Option[], index: number) => void;
  onDrugUsageSelect: (options: Option[]) => void;
  onDrugFrequencySelect: (options: Option[]) => void;
  addMedication: () => void;
  removeMedication: (index: number) => void;
  onMedicationDosageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    medicationClass: Analysis.NeuropsichologicalMedicationClasses
  ) => void;
  onDiagnosisAgeSelected: (dateObj: Date) => void;
}

const NeuropsichologicalProfileAdditionalInformationComponent: React.FC<INeuropsichologicalProfileAdditionalInformationComponentProps> = React.memo(
  ({
    medicationOptions,
    drugUsageOptions,
    drugFrequencyOptions,
    selectedMedication,
    selectedDrugUsage,
    selectedDrugFrequency,
    medicationDosages,
    draftAdditionalInfo,
    onTextFieldChange,
    onPreviousClick,
    onNextClick,
    onDrugFrequencySelect,
    onDrugUsageSelect,
    onMedicationSelect,
    addMedication,
    removeMedication,
    onMedicationDosageChange,
    onDiagnosisAgeSelected,
  }) => {
    const intl = useIntl();

    return (
      <Card flex="1">
        <Flex justify="space-between">
          <H6>
            {intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.additionalInformation',
            })}
          </H6>
          <Flex>
            <div>
              <OutlineButton
                size="small"
                onClick={onPreviousClick}
                style={{ marginRight: grid(1) }}
              >
                {intl.formatMessage({ id: 'common.previousStep' })}
              </OutlineButton>
            </div>
            <div>
              <OutlineButton size="small" onClick={onNextClick}>
                {intl.formatMessage({ id: 'common.nextStep' })}
              </OutlineButton>
            </div>
          </Flex>
        </Flex>
        <CoreSetCategoryLabel>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.medicationTitle',
          })}
          <Tooltip wide="very" position="bottom left">
            <H8>
              {intl.formatMessage(
                {
                  id:
                    'analysis.neuropsichologicalProfile.additionalInformationMedicationTooltip',
                },
                { linebreak: <br /> }
              )}
            </H8>
          </Tooltip>
        </CoreSetCategoryLabel>
        {selectedMedication.map((medication, index) => (
          <Flex flex="1" key={`${index}${medicationDosages[index]}`}>
            <Flex flex="1" style={{ marginRight: !index ? grid(5) : 0 }}>
              <SelectField
                id={'medicationSelection-' + index}
                options={medicationOptions}
                selectedOptions={medication}
                onChange={(options) => onMedicationSelect(options, index)}
                labelText={intl.formatMessage({
                  id: 'analysis.neuropsichologicalProfile.medicationClassLabel',
                })}
                placeholder={intl.formatMessage({
                  id:
                    'analysis.neuropsichologicalProfile.medicationClassPlaceholder',
                })}
                flex="2"
                style={{ marginRight: grid(4), marginBottom: grid(2) }}
              />
              <TextField
                id={'medication-dosage' + index}
                disabled={!medication.length}
                defaultValue={medicationDosages[index] || ''}
                onChange={(e) =>
                  onMedicationDosageChange(
                    e,
                    index,
                    medication[0]
                      .key as Analysis.NeuropsichologicalMedicationClasses
                  )
                }
                labelText={intl.formatMessage({
                  id:
                    'analysis.neuropsichologicalProfile.medicationDosageLabel',
                })}
                placeholder={intl.formatMessage({
                  id:
                    'analysis.neuropsichologicalProfile.medicationDosagePlaceholder',
                })}
                flex="2"
              />
            </Flex>
            {!!index && (
              <Flex
                direction="column"
                justify="center"
                style={{
                  marginLeft: grid(2),
                  marginTop: grid(1.5),
                  cursor: 'pointer',
                }}
                onClick={() => removeMedication(index)}
              >
                <CloseIcon />
              </Flex>
            )}
          </Flex>
        ))}

        <div>
          <OutlineButton size="small" onClick={() => addMedication()}>
            {intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.addMedication',
            })}
          </OutlineButton>
        </div>
        <CoreSetCategoryLabel style={{ marginBottom: grid(2) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.neuroProgression',
          })}
          <Tooltip wide="very" position="bottom left">
            <H8>
              {intl.formatMessage(
                {
                  id:
                    'analysis.neuropsichologicalProfile.additionalInformationNeuroprogressionTooltip',
                },
                { linebreak: <br /> }
              )}
            </H8>
          </Tooltip>
        </CoreSetCategoryLabel>
        <Flex flex="1">
          <DatePicker
            maxDate={new Date().toISOString()}
            dateFormat="d/m/Y"
            value={draftAdditionalInfo.diagnosisAge}
            onChange={(dateArr) => onDiagnosisAgeSelected(dateArr[0])}
            style={{ marginBottom: grid(2), width: '100%' }}
          >
            <DatePickerInput
              readOnly
              id="diagnosisAge"
              labelText={intl.formatMessage({
                id: 'analysis.neuropsichologicalProfile.diagnosisAgeLabel',
              })}
              placeholder={intl.formatMessage({
                id:
                  'analysis.neuropsichologicalProfile.diagnosisAgePlaceholder',
              })}
            />
          </DatePicker>
        </Flex>
        <div>
          <TextArea
            value={draftAdditionalInfo.evolutionTime}
            onChange={onTextFieldChange}
            id="evolutionTime"
            labelText={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.evolutionTimeLabel',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.evolutionTimePlaceholder',
            })}
            flex="1"
            style={{ marginBottom: grid(2) }}
          />
        </div>
        <div>
          <TextArea
            value={draftAdditionalInfo.familyHistory}
            onChange={onTextFieldChange}
            id="familyHistory"
            labelText={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.familyHistoryLabel',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.familyHistoryPlaceholder',
            })}
            flex="1"
            style={{ marginBottom: grid(2) }}
          />
        </div>
        <div>
          <TextArea
            value={draftAdditionalInfo.moodSwingEpisodes}
            onChange={onTextFieldChange}
            id="moodSwingEpisodes"
            labelText={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.moodSwingEpisodesLabel',
            })}
            placeholder={intl.formatMessage({
              id:
                'analysis.neuropsichologicalProfile.moodSwingEpisodesPlaceholder',
            })}
            flex="1"
            style={{ marginBottom: grid(2) }}
          />
        </div>
        <TextField
          id="selfTerminationAttempts"
          type="number"
          min={0}
          value={draftAdditionalInfo.selfTerminationAttempts}
          onChange={onTextFieldChange}
          labelText={intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.selfTerminationAttemptsLabel',
          })}
          placeholder={intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.selfTerminationAttemptsPlaceholder',
          })}
          flex="1"
          style={{ marginBottom: grid(2) }}
        />
        <SelectField
          id="drugUsage"
          options={drugUsageOptions}
          selectedOptions={selectedDrugUsage}
          onChange={onDrugUsageSelect}
          labelText={intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.drugUsageLabel',
          })}
          placeholder={intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.drugUsagePlaceholder',
          })}
          flex="1"
          style={{ marginBottom: grid(2) }}
        />
        <div>
          <Flex>
            <SelectField
              id="drugFrequency"
              options={drugFrequencyOptions}
              selectedOptions={selectedDrugFrequency}
              onChange={onDrugFrequencySelect}
              labelText={intl.formatMessage({
                id: 'analysis.neuropsichologicalProfile.drugFrequencyLabel',
              })}
              placeholder={intl.formatMessage({
                id:
                  'analysis.neuropsichologicalProfile.drugFrequencyPlaceholder',
              })}
              flex="1"
              style={{ marginBottom: grid(2), marginRight: grid(4) }}
            />
            <TextArea
              value={draftAdditionalInfo.drugAmount}
              onChange={onTextFieldChange}
              id="drugAmount"
              labelText={intl.formatMessage({
                id: 'analysis.neuropsichologicalProfile.drugAmountLabel',
              })}
              placeholder={intl.formatMessage({
                id: 'analysis.neuropsichologicalProfile.drugAmountPlaceholder',
              })}
              flex="1"
              style={{ marginBottom: grid(2) }}
            />
          </Flex>
        </div>
        <div>
          <TextArea
            value={draftAdditionalInfo.drugUsageTime}
            onChange={onTextFieldChange}
            id="drugUsageTime"
            labelText={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.drugUsageTimeLabel',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.drugUsageTimePlaceholder',
            })}
            flex="1"
            style={{ marginBottom: grid(2) }}
          />
        </div>
        <TextField
          type="number"
          min={0}
          value={draftAdditionalInfo.psychiatricHospitalizations}
          onChange={onTextFieldChange}
          id="psychiatricHospitalizations"
          labelText={intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.psychiatricHospitalizationsLabel',
          })}
          placeholder={intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.psychiatricHospitalizationsPlaceholder',
          })}
          flex="1"
          style={{ marginBottom: grid(2) }}
        />
        <TextField
          id="ectOccurrences"
          type="number"
          min={0}
          value={draftAdditionalInfo.ectOccurrences}
          onChange={onTextFieldChange}
          labelText={intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.ectLabel',
          })}
          placeholder={intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.ectPlaceholder',
          })}
          flex="1"
          style={{ marginBottom: grid(2) }}
        />

        <CoreSetCategoryLabel style={{ marginBottom: grid(2) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.patientOrFamilyTestimony',
          })}
        </CoreSetCategoryLabel>
        <div>
          <TextArea
            value={draftAdditionalInfo.mainComplaints}
            onChange={onTextFieldChange}
            id="mainComplaints"
            labelText={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.mainComplaintsLabel',
            })}
            placeholder={intl.formatMessage({
              id:
                'analysis.neuropsichologicalProfile.mainComplaintsPlaceholder',
            })}
            flex="1"
            style={{ marginBottom: grid(2) }}
          />
        </div>
        <Flex justify="space-between">
          <div>
            <OutlineButton
              size="small"
              onClick={onPreviousClick}
              style={{ marginRight: grid(1) }}
            >
              {intl.formatMessage({ id: 'common.previousStep' })}
            </OutlineButton>
          </div>
          <div>
            <OutlineButton size="small" onClick={onNextClick}>
              {intl.formatMessage({ id: 'common.nextStep' })}
            </OutlineButton>
          </div>
        </Flex>
      </Card>
    );
  }
);

export default NeuropsichologicalProfileAdditionalInformationComponent;
