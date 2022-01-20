import styled from 'styled-components';

import Flex from './Flex';
import { themeGrid, themeProp } from '../utils/functional';

const buttonPaddings = {
  small: themeGrid(1),
  normal: themeGrid(1.5),
  large: themeGrid(1.75),
};

const buttonFontSizes = {
  small: themeGrid(1.5),
  normal: themeGrid(1.75),
  large: themeGrid(2.25),
};

interface IBaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'normal' | 'large';
}

// TODO: button loading state
const BaseButton = styled(Flex).attrs({ as: 'button' })<IBaseButtonProps>`
  cursor: pointer;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  border-radius: ${themeGrid(0.5)};
  background-color: ${themeProp('colors.primary.transparent')};
  padding: ${(props) => buttonPaddings[props.size || 'normal'](props)};
  font-size: ${(props) => buttonFontSizes[props.size || 'normal'](props)};
  line-height: ${(props) => buttonFontSizes[props.size || 'normal'](props)};

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
  }
`;

export const GhostButton = styled(BaseButton)`
  color: ${themeProp('colors.primary.purple')};

  &:hover,
  &:active {
    color: ${themeProp('colors.secondary.purple')};
  }
`;

export const OutlineButton = styled(BaseButton)`
  color: ${themeProp('colors.primary.purple')};
  border: 1px solid ${themeProp('colors.primary.purple')};

  &:hover,
  &:active {
    color: ${themeProp('colors.primary.gray')};
    border: 1px solid ${themeProp('colors.secondary.purple')};
    background-color: ${themeProp('colors.secondary.purple')};
  }
`;

const FilledButton = styled(BaseButton)`
  background-color: ${themeProp('colors.primary.purple')};
  color: ${themeProp('colors.primary.white')};

  &:hover,
  &:active {
    color: ${themeProp('colors.primary.gray')};
    background-color: ${themeProp('colors.secondary.purple')};
  }
`;

export default FilledButton;
