import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../Card';
import Flex from '../../Flex';
import { H6, Link } from '../../Typography';
import { OutlineButton } from '../../Button';
import Select, { Option } from '../../Select';
import { grid } from '../../../config/theme';
import { ROUTE_PATIENTS_CREATE } from '../../../modules/patients/constants';

interface ISharedAnalysisPatientComponentProps {
  patientOptions: Option[];
  selectedPatient?: Option;
  onSearchChange: (term: string) => void;
  onPatientSelection: (options: Option[]) => void;
  onNextClick: () => void;
  coreSetOptions?: Option[];
  selectedCoreSet?: Option;
  onCoreSetSelection?: (options: Option[]) => void;
}

const SharedAnalysisPatientComponent: React.FC<ISharedAnalysisPatientComponentProps> = ({
  selectedPatient,
  patientOptions,
  onPatientSelection,
  onSearchChange,
  onNextClick,
  coreSetOptions = [],
  selectedCoreSet,
  onCoreSetSelection,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <Flex direction="column">
          <H6>{intl.formatMessage({ id: 'analysis.choosePatient' })}</H6>
          <H6 color="gray" style={{ marginTop: grid(2) }}>
            {intl.formatMessage({
              id: 'analysis.choosePatientDescription',
            })}
          </H6>
        </Flex>
        <div>
          <OutlineButton size="small" onClick={onNextClick}>
            {intl.formatMessage({ id: 'common.nextStep' })}
          </OutlineButton>
        </div>
      </Flex>
      <H6 color="gray" style={{ margin: `${grid(2)} 0` }}>
        {intl.formatMessage({ id: 'common.patient' })}
      </H6>
      <Select
        required
        searchable
        options={patientOptions}
        selectedOptions={selectedPatient ? [selectedPatient] : []}
        onSearchChange={onSearchChange}
        onChange={onPatientSelection}
        searchPlaceHolder={intl.formatMessage({
          id: 'analysis.searchByName',
        })}
        placeholder={intl.formatMessage({
          id: 'analysis.selectPacientPlaceholder',
        })}
      />
      <H6 color="gray" style={{ marginTop: grid(2) }}>
        {intl.formatMessage(
          { id: 'analysis.createPatientIfNeeded' },
          {
            link: (
              <Link
                to={ROUTE_PATIENTS_CREATE.replace(':verb', 'create')}
                style={{ fontWeight: 'bold' }}
              >
                {intl.formatMessage({ id: 'analysis.clickHere' })}
              </Link>
            ),
          }
        )}
      </H6>
      {typeof onCoreSetSelection === 'function' ? (
        <>
          <H6 color="gray" style={{ margin: `${grid(2)} 0` }}>
            {intl.formatMessage({ id: 'analysis.selectDiagnostic' })}
          </H6>
          <Select
            required
            options={coreSetOptions}
            selectedOptions={selectedCoreSet ? [selectedCoreSet] : []}
            onChange={onCoreSetSelection}
            placeholder={intl.formatMessage({
              id: 'analysis.selectCoreSetPlaceholder',
            })}
          />
        </>
      ) : null}
    </Card>
  );
};

export default SharedAnalysisPatientComponent;
