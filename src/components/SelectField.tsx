import React from 'react';
import styled from 'styled-components';

import Flex from './Flex';
import Select, { ISelectProps } from './Select';
import { Label, ValidationMessage } from './Typography';

import { themeGrid, themeProp } from '../utils/functional';

export interface ISelectFieldProps extends ISelectProps {
  id?: string;
  flex?: string;
  required?: boolean;
  className?: string;
  labelText?: string;
  validationText?: string;
  selectFieldStyle?: any;
  disabled?: boolean;
}

const SelectField: React.FC<ISelectFieldProps> = ({
  id,
  flex,
  required,
  labelText,
  validationText,
  className,
  selectFieldStyle,
  ...props
}) => (
  <SelectFieldWrapper
    flex={flex}
    direction="column"
    className={className}
    style={selectFieldStyle}
  >
    {labelText && (
      <Label htmlFor={id} color="gray">
        {labelText}
        {required && '*'}
      </Label>
    )}
    <Select id={id} required={required} {...props} />
    {validationText && (
      <ValidationMessage bold>{validationText}</ValidationMessage>
    )}
  </SelectFieldWrapper>
);

const SelectFieldWrapper = styled(Flex)`
  ${Label} {
    margin-bottom: ${themeGrid(1.5)};
  }

  ${ValidationMessage} {
    margin-top: ${themeGrid(1.5)};
    color: ${themeProp('colors.situational.danger')};
  }
`;

export default styled(SelectField)``;
