import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

import Flex from './Flex';
import Input from './Input';
import { Label, ValidationMessage } from './Typography';

import { themeGrid, themeProp } from '../utils/functional';

export interface ITextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  mask?: string;
  flex?: string;
  textarea?: boolean;
  required?: boolean;
  className?: string;
  labelText?: string;
  validationText?: string;
  rows?: string;
  wrap?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, ITextFieldProps>(
  (
    {
      id,
      mask,
      flex,
      required,
      disabled,
      readOnly,
      onBlur,
      onChange,
      labelText,
      validationText,
      className,
      ...props
    },
    forwardedRef
  ) => (
    <TextFieldWrapper flex={flex} direction="column" className={className}>
      {labelText && (
        <Label htmlFor={id} color="gray">
          {labelText}
          {required && '*'}
        </Label>
      )}
      {mask ? (
        <InputMask {...{ mask, disabled, readOnly, onChange, onBlur }}>
          <Input id={id} name={id} ref={forwardedRef} {...props} />
        </InputMask>
      ) : (
        <Input
          id={id}
          name={id}
          ref={forwardedRef}
          {...{ disabled, readOnly, onChange, onBlur }}
          {...props}
        />
      )}
      {validationText && (
        <ValidationMessage bold>{validationText}</ValidationMessage>
      )}
    </TextFieldWrapper>
  )
);

const TextFieldWrapper = styled(Flex)`
  ${Input} {
    margin-top: ${themeGrid(1.5)};
  }

  ${ValidationMessage} {
    margin-top: ${themeGrid(1.5)};
    color: ${themeProp('colors.situational.danger')};
  }
`;

export default styled(TextField)``;
