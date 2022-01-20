import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import ErrorTemplate from './ErrorTemplate';

import { H5, H6, Link } from '../Typography';
import { OutlineButton } from '../Button';
import { ROUTES } from '../../modules/auth/constants';
import { themeGrid } from '../../utils/functional';
import notFoundIllustration from '../../assets/images/not-found.svg';

const NotFound: React.FC = () => {
  const intl = useIntl();

  return (
    <StyledErrorTemplate>
      <img src={notFoundIllustration} alt="4 0 4 illustration" />
      <H5 align="center">
        {intl.formatMessage({ id: 'errors.notFound.title' })}
      </H5>
      <H6 align="center">
        {intl.formatMessage({ id: 'errors.notFound.subtitle' })}
      </H6>
      <Link to={ROUTES.LOGIN}>
        <OutlineButton type="button" size="small">
          {intl.formatMessage({ id: 'errors.notFound.goToHome' })}
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

export default NotFound;
