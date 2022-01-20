import React from 'react';
import styled from 'styled-components';

import Flex from '../Flex';
import Logo from '../Logo';
import Footer from '../Shared/Footer';
import { themeGrid, themeProp } from '../../utils/functional';

interface IErrorTemplateProps {
  className?: string;
  hideFooter?: boolean;
}

const ErrorTemplate: React.FC<IErrorTemplateProps> = ({
  className,
  children,
  hideFooter,
}) => (
  <ErrorTemplateWrapper
    direction="column"
    justify="center"
    align="center"
    className={className}
  >
    <Logo white width={188} height={188} />
    <Flex direction="column" align="center" className="error-content">
      {children}
    </Flex>
    {!hideFooter && <Footer hideAdminAccess />}
  </ErrorTemplateWrapper>
);

const ErrorTemplateWrapper = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background-color: ${themeProp('colors.secondary.silver')};

  ${Flex}.error-content {
    margin: ${themeGrid(4)} 0;
  }

  img {
    margin-bottom: ${themeGrid(4)};
  }
`;

export default styled(ErrorTemplate)``;
