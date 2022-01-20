import React from 'react';
import styled from 'styled-components';

import { themeGrid, themeProp } from '../utils/functional';

import Circle from './Circle';
import Flex from './Flex';
import Separator from './Separator';

interface ITimelineItemProps {
  bulletContent?: React.ReactNode;
}

export const TimelineItem: React.FC<ITimelineItemProps> = ({
  bulletContent,
  children,
}) => (
  <Flex flex="1" as="li">
    <TimelineTrack>
      <TimelineBullet>
        {bulletContent || <Circle backgroundColor="secondary.green" />}
      </TimelineBullet>
    </TimelineTrack>
    <TimelineItemContent flex="1">
      {children}
      <Separator margin="2 0 0 0" />
    </TimelineItemContent>
  </Flex>
);

const TimelineItemContent = styled(Flex).attrs({ direction: 'column' })`
  margin-bottom: ${themeGrid(2)};
  margin-right: ${themeGrid(1)};
`;

const TimelineBullet = styled(Flex).attrs({
  justify: 'center',
  align: 'center',
})`
  width: ${themeGrid(2)};
  height: ${themeGrid(2)};
  border: 1px solid ${themeProp('colors.primary.silver')};
  background-color: ${themeProp('colors.primary.white')};
  box-shadow: 0 2px 8px 0 ${themeProp('colors.primary.silver')};
  border-radius: 100%;
  z-index: 1;
`;

const TimelineTrack = styled(Flex)`
  margin-right: ${themeGrid(1)};
  position: relative;

  &:before {
    content: '';
    background-color: ${themeProp('colors.primary.silver')};
    width: ${themeGrid(0.25)};
    height: 100%;
    position: absolute;
    left: 45%;
  }
`;
