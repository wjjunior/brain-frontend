import styled from 'styled-components';
import { InlineNotification as CarbonInlineNotification } from 'carbon-components-react';
import 'carbon-components/css/carbon-components.css';

import { themeProp } from '../utils/functional';

const Notification = styled(CarbonInlineNotification)`
  &.bx--inline-notification {
    background-color: ${themeProp('colors.primary.white')};
    box-shadow: 0 2px 10px 2px ${themeProp('colors.primary.silver')};
    color: ${themeProp('colors.primary.gray')};
    margin: 0;

    a {
      color: ${themeProp('colors.primary.purple')};
    }

    .bx--inline-notification__close-button
      .bx--inline-notification__close-icon {
      fill: ${themeProp('colors.secondary.gray')};
    }

    &--success {
      border-color: ${themeProp('colors.secondary.green')};

      .bx--inline-notification__icon {
        fill: ${themeProp('colors.secondary.green')};
      }
    }

    &--warning {
      border-color: ${themeProp('colors.situational.warning')};

      .bx--inline-notification__icon {
        fill: ${themeProp('colors.situational.warning')};

        path[data-icon-path='inner-path'] {
          fill: ${themeProp('colors.primary.white')};
        }
      }
    }

    &--error {
      border-color: ${themeProp('colors.situational.danger')};

      .bx--inline-notification__icon {
        fill: ${themeProp('colors.situational.danger')};
      }
    }

    &--info {
      border-color: ${themeProp('colors.situational.info')};

      .bx--inline-notification__icon {
        fill: ${themeProp('colors.situational.info')};
      }
    }
  }
`;

export default Notification;
