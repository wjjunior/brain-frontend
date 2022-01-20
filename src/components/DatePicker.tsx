import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  DatePicker as CarbonDatePicker,
  DatePickerInput as CarbonDatePickerInput,
  DatePickerProps,
} from 'carbon-components-react';
import 'carbon-components/css/carbon-components.css';

import { themeGrid, themeProp } from '../utils/functional';

const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <>
      <GlobalStyle />
      <StyledDatePicker
        light
        locale="pt"
        dateFormat="d/m/Y"
        datePickerType="single"
        {...props}
      />
    </>
  );
};

const StyledDatePicker = styled(CarbonDatePicker)`
  .bx--label {
    color: ${themeProp('colors.primary.gray')};
    font-size: ${themeGrid(1.75)};
  }

  .bx--form-requirement {
    font-weight: bold !important;
    color: ${themeProp('colors.situational.danger')};
  }

  .bx--date-picker {
    flex: 1;

    &-container {
      flex: 1;
    }

    &__input {
      background-color: ${themeProp('colors.primary.white')};
      border: 1px solid ${themeProp('colors.primary.silver')};
      border-radius: ${themeGrid(0.5)};
      font-family: 'Mulish', sans-serif !important;
      width: 100% !important;
      display: flex;
      flex: 1;

      &:placeholder {
        color: ${themeProp('colors.secondary.gray')} !important;
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

      &[data-invalid] {
        outline: none;
        border: 1px solid ${themeProp('colors.primary.silver')};
        border-radius: ${themeGrid(0.5)};
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  .bx--date-picker__calendar.open {
    background-color: ${themeProp('colors.primary.white')};

    &:focus {
      outline: none;
      border: none;
    }

    .flatpickr-prev-month,
    .flatpickr-next-month {
      border-radius: 100%;

      &:hover {
        background-color: ${themeProp('colors.secondary.silver')};
      }
    }

    .numInputWrapper .numInput {
      background-color: ${themeProp('colors.primary.white')};

      &:active,
      &:focus {
        outline: none;
        border: 1px solid ${themeProp('colors.secondary.purple')};
      }
    }

    .bx--date-picker__day {
      border-radius: 100%;

      &:hover:not(.selected) {
        background-color: ${themeProp('colors.secondary.silver')};
      }

      &.today {
        color: ${themeProp('colors.secondary.purple')};
        outline: none;
        border: none;

        &:focus {
          outline: none;
          border: none;
        }
        
        &:after {
          border-radius: 100%;
          background-color: ${themeProp('colors.secondary.purple')};
        }
      }

      &.selected {
        background-color: ${themeProp('colors.secondary.purple')};
        color: ${themeProp('colors.primary.white')};
      }
    }
  }
`;

export default DatePicker;
export { CarbonDatePickerInput as DatePickerInput };
