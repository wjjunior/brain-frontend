import React from 'react';
import styled from 'styled-components';

import Flex from '../../components/Flex';
import Notification from '../../components/Notification';
import { themeGrid } from '../../utils/functional';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../modules/shared';
import { closeToast } from '../../modules/shared/actions';
import { useIntl } from 'react-intl';

const Toaster: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const toasts = useSelector(selectors.toasts);

  function onCloseClick(toastId: string) {
    dispatch(closeToast(toastId));
  }

  return (
    <ToasterContainer>
      {toasts.map(
        ({ id, title, titleKey, subtitle, subtitleKey, action, ...toast }) => (
          <Notification
            {...toast}
            key={id}
            title={title || intl.formatMessage({ id: titleKey })}
            subtitle={subtitle || intl.formatMessage({ id: subtitleKey })}
            actions={action}
            onCloseButtonClick={() => onCloseClick(id)}
          />
        )
      )}
    </ToasterContainer>
  );
};

const ToasterContainer = styled(Flex).attrs({
  direction: 'column',
  align: 'center',
  flex: '1',
})`
  z-index: 10000;
  position: fixed;
  top: ${themeGrid(8)};
  left: calc(50% - ${themeGrid(80 / 2)});
  right: calc(50% - ${themeGrid(80 / 2)});

  ${Notification}:not(:first-child) {
    margin-top: ${themeGrid(1)};
  }
`;

export default Toaster;
