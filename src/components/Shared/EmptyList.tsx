import React from 'react';
import styled from 'styled-components';

import Flex from '../Flex';
import { H5, H6 } from '../Typography';

import { themeGrid, themeProp } from '../../utils/functional';
import emptyListIllustration from '../../assets/images/empty-list.svg';

interface IEmptyListProps {
  title: string;
  subtitle: string;
}

const EmptyList: React.FC<IEmptyListProps> = ({ title, subtitle }) => (
  <Wrapper direction="column" justify="center" align="center">
    <Flex direction="column" align="center" className="error-content">
      <img src={emptyListIllustration} alt="4 0 4 illustration" />
      <H5 align="center">{title}</H5>
      <H6 align="center">{subtitle}</H6>
    </Flex>
  </Wrapper>
);

const Wrapper = styled(Flex)`
  background-color: ${themeProp('colors.secondary.silver')};

  ${Flex}.error-content {
    margin: ${themeGrid(4)} 0;
  }

  img {
    margin-bottom: ${themeGrid(4)};
  }

  ${H6} {
    margin-top: ${themeGrid(1)};
  }
`;

export default styled(EmptyList)``;
