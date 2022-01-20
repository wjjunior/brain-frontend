import styled from 'styled-components';

import Card from '../Card';
import { H7 } from '../Typography';
import { themeGrid, themeProp } from '../../utils/functional';

const RowMenu = styled(Card).attrs({ as: 'ul' })`
  box-shadow: 0px 2px 10px rgba(245, 244, 255, 0.64);
  margin-top: ${themeGrid(3)};
  margin-left: -${themeGrid(18.75)};
  padding: ${themeGrid(2)};
  width: ${themeGrid(22)};
  z-index: 1;

  li {
    cursor: pointer;

    svg {
      margin-right: ${themeGrid(2)};

      path {
        fill: ${themeProp('colors.primary.gray')};
      }
    }

    &:hover {
      ${H7} {
        color: ${themeProp('colors.primary.purple')};
      }

      svg path {
        fill: ${themeProp('colors.primary.purple')};
      }
    }
  }

  &,
  &:before {
    position: absolute;
  }

  &:before {
    content: ' ';
    width: ${themeGrid(1.25)};
    height: ${themeGrid(1.25)};
    top: -${themeGrid(0.75)};
    right: ${themeGrid(1.025)};
    transform: rotate(45deg);
    border-bottom: none !important;
    border-right: none !important;
    border: 1px solid ${themeProp('colors.primary.silver')};
    background-color: ${themeProp('colors.primary.white')};
  }
`;

export default RowMenu;
