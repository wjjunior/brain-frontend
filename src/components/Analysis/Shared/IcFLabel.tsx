import React from 'react';
import styled from 'styled-components';

import Flex from '../../Flex';
import { H6 } from '../../Typography';
import { grid } from '../../../config/theme';
import { themeGrid, themeProp } from '../../../utils/functional';

interface IIcFLabelProps {
  code: string;
  name: string;
}

const IcFLabel: React.FC<IIcFLabelProps> = ({ code, name }) => (
  <Flex>
    {!!code && <Tag style={{ marginRight: grid(1) }}>{code}</Tag>}
    <InlineH6 color="gray" truncateText>
      {name}
    </InlineH6>
  </Flex>
);

const Tag = styled(H6).attrs({ as: 'div' })`
  background: ${themeProp('colors.situational.info')};
  border-radius: ${themeGrid(0.5)};
  padding: ${themeGrid(0.75)};
  width: fit-content;
  height: fit-content;
`;

const InlineH6 = styled(H6).attrs({ as: 'span' })``;

export default IcFLabel;
