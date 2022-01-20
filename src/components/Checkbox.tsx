import styled from 'styled-components';
import { Checkbox as SemanticCheckbox } from 'semantic-ui-react';

import { themeGrid, themeProp } from '../utils/functional';

const Checkbox = styled(SemanticCheckbox)`
  &.ui.checkbox {
    label {
      padding-left: ${themeGrid(3)};
      font-size: ${themeGrid(1.25)};
      color: ${themeProp('colors.primary.dark_blue')};

      &:before {
        border-color: ${themeProp('colors.primary.silver')};
      }

      &:after {
        transform: scale(0.75);
      }
    }

    input {
      &:checked ~ label:before {
        border-color: ${themeProp('colors.primary.gray')};
      }

      &:checked ~ label:after {
        color: ${themeProp('colors.situational.green')};
      }

      &:focus:not(:checked) ~ label:before {
        border-color: ${themeProp('colors.primary.silver')};
      }
    }
  }
`;

export default Checkbox;
