import styled from 'styled-components';

import { themeProp } from '../utils/functional';

interface ISeparatorProps {
  margin?: string;
}

const Separator = styled.hr<ISeparatorProps>`
  border: none;
  border-top: 1px solid ${themeProp('colors.primary.silver')};
  margin: ${(props) =>
    (props.margin || '')
      .split(' ')
      .filter((chunk) => chunk)
      .map((multiplier) => props.theme.grid(parseInt(multiplier)))
      .join(' ')};
`;

export default Separator;
