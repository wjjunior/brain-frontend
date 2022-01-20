import React from 'react';
import styled from 'styled-components';
import cc from 'classcat';

import { H8 } from './Typography';

import { transformTextIntoInitials } from '../utils/formatting';
import { themeGrid, themeProp } from '../utils/functional';

interface IInitialsProps {
  text: string;
  size?: number;
  filled?: boolean;
  backgroundColor?: string;
}

const Initials: React.FC<IInitialsProps> = ({ text, filled, ...props }) => (
  <InitialsWrapper className={cc({ filled })} {...props}>
    {transformTextIntoInitials(text)}
  </InitialsWrapper>
);

const InitialsWrapper = styled(H8)<
  Pick<IInitialsProps, 'size' | 'backgroundColor'>
>`
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => themeGrid(props.size || 3.5)};
  height: ${(props) => themeGrid(props.size || 3.5)};
  margin-right: ${themeGrid(1)};
  color: ${themeProp('colors.primary.gray')};
  border: 1px solid ${themeProp('colors.primary.gray')};
  background-color: ${themeProp('colors.primary.white')};

  &.filled {
    border: 1px solid
      ${(props) =>
        themeProp(props.backgroundColor || 'colors.secondary.gray')(props)};
    background-color: ${(props) =>
      themeProp(props.backgroundColor || 'colors.secondary.gray')(props)};
    color: ${themeProp('colors.primary.gray')};
  }
`;

export default Initials;
