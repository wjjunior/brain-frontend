import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { themeGrid, themeProp } from '../utils/functional';

export interface ITypographyProps {
  truncateText?: boolean;
  bold?: boolean;
  color?: string;
  align?: string;
  transform?: string;
}

const Typography = styled.span<ITypographyProps>`
  margin: 0;
  font-family: 'Mulish', sans-serif;
  font-weight: ${(props) => (props.bold ? 700 : 400)};
  text-align: ${(props) => props.align || 'start'};
  color: ${(props) => props.theme.colors.primary[props.color || 'dark_blue']};
  text-transform: ${(props) => props.transform || 'none'};

  overflow: ${(props) => (props.truncateText ? 'hidden' : 'visible')};
  white-space: ${(props) => (props.truncateText ? 'nowrap' : 'normal')};
  text-overflow: ${(props) => (props.truncateText ? 'ellipsis' : 'clip')};
`;

export const H1 = styled(Typography).attrs({ as: 'h1' })`
  font-size: ${themeGrid(4)};
  line-height: ${themeGrid(4)};
`;

export const H2 = styled(Typography).attrs({ as: 'h2' })`
  font-size: ${themeGrid(3)};
  line-height: ${themeGrid(3)};
`;

export const H3 = styled(Typography).attrs({ as: 'h3' })`
  font-size: ${themeGrid(2.5)};
  line-height: ${themeGrid(2.5)};
`;

export const H4 = styled(Typography).attrs({ as: 'h4' })`
  font-size: ${themeGrid(2.25)};
  line-height: ${themeGrid(2.25)};
`;

export const H5 = styled(Typography).attrs({ as: 'h5' })`
  font-size: ${themeGrid(2)};
  line-height: ${themeGrid(2)};
`;

export const H6 = styled(Typography).attrs({ as: 'h6' })`
  font-size: ${themeGrid(1.75)};
  line-height: ${themeGrid(1.75)};
`;

export const H7 = styled(Typography)`
  font-size: ${themeGrid(1.5)};
  line-height: ${themeGrid(1.5)};
`;

export const H8 = styled(Typography)`
  font-size: ${themeGrid(1.25)};
  line-height: ${themeGrid(1.25)};
`;

export const Label = styled<any>(H6).attrs({
  as: 'label',
})``;

export const ValidationMessage = styled(H7).attrs({
  as: 'label',
})``;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${themeProp('colors.primary.purple')};

  &:visited {
    color: ${themeProp('colors.primary.purple')};
  }
`;

export const ExternalLink = styled.a<{ bold?: boolean }>`
  text-decoration: none;
  color: ${themeProp('colors.primary.purple')};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
  cursor: pointer;

  &:hover {
    color: ${themeProp('colors.secondary.purple')};
  }

  &:visited {
    color: ${themeProp('colors.primary.purple')};
  }
`;
