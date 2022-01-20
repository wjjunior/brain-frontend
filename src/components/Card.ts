import styled from 'styled-components';

import Flex, { IFlexProps } from './Flex';

import { themeGrid, themeProp } from '../utils/functional';

const Card = styled(Flex).attrs<IFlexProps>((props) => ({
  direction: props.direction || 'column',
}))`
  background-color: ${themeProp('colors.primary.white')};
  border: 1px solid;
  border-color: ${themeProp('colors.primary.silver')};
  border-radius: ${themeGrid(0.5)};
  padding: ${themeGrid(2)};
`;

export default Card;
