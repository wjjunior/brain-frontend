import styled from 'styled-components';

import { themeProp, themeGrid } from '../utils/functional';

interface IInputProps {
  textarea?: boolean;
}

const Input = styled.input.attrs(({ textarea }: IInputProps) => ({
  as: textarea ? 'textarea' : 'input',
}))<IInputProps>`
  background-color: ${themeProp('colors.primary.white')};
  border: 1px solid;
  border-color: ${themeProp('colors.primary.silver')};
  border-radius: ${themeGrid(0.5)};
  padding: ${themeGrid(1.25)} ${themeGrid(2.25)};
  font-size: ${themeGrid(1.75)};
  line-height: ${themeGrid(2.05)};
  color: ${themeProp('colors.primary.dark_blue')};
  max-height: ${(props) => (props.textarea ? 'none' : themeGrid(4.75))};

  flex: 1;
  display: block;
  min-width: 0;

  &:placeholder,
  &:disabled,
  &[disabled] {
    color: ${themeProp('colors.secondary.gray')};
  }

  &:active,
  &:focus {
    outline: none;
    border-color: ${themeProp('colors.secondary.purple')};
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    border-color: ${themeProp('colors.primary.silver')};
    background-color: ${themeProp('colors.primary.silver')};
  }
`;

export default Input;
