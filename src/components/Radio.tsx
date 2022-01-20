import React from 'react';
import styled from 'styled-components';

import { themeGrid, themeProp } from '../utils/functional';
import { H7 } from './Typography';

interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio: React.FC<IRadioProps> = ({
  id,
  className,
  children,
  ...props
}) => (
  <RadioWrapper className={className}>
    <input id={id} type="radio" {...props} />
    <RadioLabel as="label" htmlFor={id}>
      {children}
    </RadioLabel>
  </RadioWrapper>
);

const RadioWrapper = styled.div`
  position: relative;
  display: grid;

  input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    outline: 0;
    opacity: 0 !important;
    z-index: 3;
    width: 100%;
    height: 100%;
  }

  input:checked + label:after {
    content: '';
  }
`;

const RadioLabel = styled(H7).attrs({ align: 'center' })`
  padding-top: ${themeGrid(4)};
  word-break: break-word;

  &:before,
  &:after {
    position: absolute;
    width: ${themeGrid(3)};
    height: ${themeGrid(3)};
    border-radius: 9999px;
    top: 0;
    left: calc(50% - ${themeGrid(3 / 1.9)});
  }

  &:before {
    content: '';
    transform: none;
    border: 1px solid ${themeProp('colors.primary.gray')};
  }

  &:after {
    transform: scale(0.65);
    background-color: ${themeProp('colors.primary.purple')};
  }
`;

export default Radio;
