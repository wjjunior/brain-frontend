import React from 'react';
import styled from 'styled-components';

import Flex from '../Flex';
import Card from '../Card';
import Footer from '../Shared/Footer';
import { themeGrid, themeProp } from '../../utils/functional';
import brainLogoWhiteSrc from '../../assets/images/brain-logo-white.png';

const AuthTemplate: React.FC = ({ children }) => (
  <AuthTemplateWrapper direction="column" justify="center" align="center">
    <img
      src={brainLogoWhiteSrc}
      alt="Brain by Nexus"
      width="188"
      height="188"
    ></img>
    <Card>{children}</Card>
    <Footer />
  </AuthTemplateWrapper>
);

const AuthTemplateWrapper = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background-color: ${themeProp('colors.secondary.silver')};

  ${Card} {
    width: ${themeGrid(45)};
    max-width: ${themeGrid(45)};
    margin: ${themeGrid(4)} 0;
    padding: ${themeGrid(4)};
  }
`;

export default AuthTemplate;
