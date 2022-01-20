import styled from 'styled-components';

import { themeGrid } from '../utils/functional';

interface ICircleProps {
  backgroundColor: string;
}

const Circle = styled.div<ICircleProps>`
  width: ${themeGrid(1)};
  height: ${themeGrid(1)};
  border-radius: 100%;
  display: inline-block;
  background-color: ${(props) =>
    props.backgroundColor
      .split('.')
      .reduce((acc, subpath) => acc[subpath], props.theme.colors)};
`;

export default Circle;
