import React from 'react';

import Flex from '../../Flex';
import Card from '../../Card';
import { H6 } from '../../Typography';
import { colors, grid } from '../../../config/theme';

import CoreSetCategoryLabel from './CoreSetCategoryLabel';

interface ICoreSetCategoryProps {
  title: string;
  description: string | React.ReactNodeArray;
}

const CoreSetCategory: React.FC<ICoreSetCategoryProps> = ({
  title,
  description,
  children,
}) => (
  <Flex direction="column">
    <CoreSetCategoryLabel>{title}</CoreSetCategoryLabel>
    <H6 style={{ color: colors.secondary.gray, marginBottom: grid(2) }}>
      {description}
    </H6>
    <Card flex="1">{children}</Card>
  </Flex>
);

export default CoreSetCategory;
