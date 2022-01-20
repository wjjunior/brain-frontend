import React from 'react';
import { useIntl } from 'react-intl';

import { H6, H7, H8 } from '../../Typography';
import { TimelineItem } from '../../Timeline';
import Card from '../../Card';
import Flex from '../../Flex';

import { colors, grid } from '../../../config/theme';
// import { ROUTE_PATIENTS_EDIT } from '../../../modules/patients/constants';
// import { ReactComponent as LinkIcon } from '../../../assets/icons/access-link.svg';

type Analysis = {
  coreSet: string;
  patient: string;
  date: string;
};

export interface ILatestAnalysisProps {
  latestAnalysis: Analysis[];
}

const LatestAnalysis: React.FC<ILatestAnalysisProps> = ({ latestAnalysis }) => {
  const intl = useIntl();

  return (
    <Card style={{ marginTop: grid(2), maxHeight: grid(35) }}>
      <H6 style={{ marginBottom: grid(2) }}>
        {intl.formatMessage({ id: 'dashboard.latestAnalysisTitle' })}
      </H6>
      <div style={{ overflowY: 'auto' }}>
        {latestAnalysis.map((analysis, index) => (
          <TimelineItem key={analysis.patient + index}>
            <Flex justify="space-between">
              <H7>{analysis.coreSet}</H7>
              <H8 style={{ color: colors.secondary.gray }}>
                {intl.formatDate(analysis.date)}
              </H8>
            </Flex>
            <H7
              bold
              truncateText
              style={{
                color: colors.secondary.gray,
                maxWidth: grid(20),
                margin: `${grid(0.5)} 0`,
              }}
            >
              {intl.formatMessage(
                { id: 'dashboard.patientName' },
                { patientName: analysis.patient }
              )}
            </H7>
            {/* <Link
              to={ROUTE_PATIENTS_EDIT.replace(':id', analysis.patientId)}
              style={{ fontSize: grid(1.5) }}
            > */}
            {/* <Flex align="center">
              <LinkIcon />
              <span style={{ marginLeft: grid(0.5) }}>
                {intl.formatMessage({ id: 'common.openRecord' })}
              </span>
            </Flex> */}
            {/* </Link> */}
          </TimelineItem>
        ))}
      </div>
    </Card>
  );
};

export default LatestAnalysis;
