import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import ErrorTemplate from './ErrorTemplate';

import { H5, H6, Link } from '../Typography';
import { OutlineButton } from '../Button';
import { ROUTES } from '../../modules/auth/constants';
import { themeGrid } from '../../utils/functional';
import internalErrorIllustration from '../../assets/images/internal-error.svg';

const InternalError: React.FC = () => {
  const intl = useIntl();

  return (
    <StyledErrorTemplate hideFooter>
      <img src={internalErrorIllustration} alt="4 0 4 illustration" />
      <H5 align="center">
        {intl.formatMessage({ id: 'errors.internalError.title' })}
      </H5>
      <H6 align="center">
        {intl.formatMessage({ id: 'errors.internalError.subtitle' })}
      </H6>
      <Link to={ROUTES.LOGIN}>
        <OutlineButton type="button" size="small">
          {intl.formatMessage({ id: 'errors.internalError.goToHome' })}
        </OutlineButton>
      </Link>
    </StyledErrorTemplate>
  );
};

const StyledErrorTemplate = styled(ErrorTemplate)`
  ${H6} {
    margin: ${themeGrid(1)} 0;
  }
`;

export default InternalError;
