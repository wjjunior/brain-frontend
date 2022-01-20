import { Progress as SemanticProgress, ProgressProps } from 'semantic-ui-react';
import styled from 'styled-components';

import { themeGrid, themeProp } from '../utils/functional';

const Progress = styled(SemanticProgress).attrs({ size: 'small' })<
  ProgressProps & { fillColor: string }
>`
  &.ui.progress {
    margin: 0;
    background: ${themeProp('colors.primary.silver')};

    .bar {
      background-color: ${(props) => themeProp('colors.' + props.fillColor)};

      .progress {
        font-size: 0;
        margin-top: -7px;
        right: 6px;

        &:after {
          content: '${(props) => props.label || ''}';
          font-size: ${themeGrid(1.75)};

          ${(props) =>
            typeof props.value === 'number' && props.value <= 2
              ? `
                  color: ${themeProp('colors.secondary.gray')(props)};
                  left: 16px;
                  position: absolute;
                `
              : ''}
        }
      }
    }

    .label {
      display: none;
    }
  }
`;

export default Progress;
