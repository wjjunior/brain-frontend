import React from 'react';
import styled from 'styled-components';

import Radio from '../Radio';

export type Option = {
  key: string;
  label: string | React.ReactNode;
};

export interface IRadioGroupProps {
  options: Option[];
  prefix?: string;
  selectedOption?: Option;
  disabled?: boolean;
  onChange: (o: Option) => void;
}

const RadioGroup: React.FC<IRadioGroupProps> = ({
  prefix,
  options,
  selectedOption,
  disabled,
  onChange,
}) => {
  function onOptionClicked(option: Option) {
    if (selectedOption && selectedOption.key === option.key) return;

    onChange(option);
  }

  return (
    <Grid repeat={options.length}>
      {options.map(({ key, label }) => (
        <Radio
          id={(prefix || '') + key}
          key={(prefix || '') + key}
          name={(prefix || '') + key}
          checked={selectedOption ? selectedOption.key === key : false}
          onChange={() => onOptionClicked({ key, label })}
          disabled={disabled ? disabled : false}
        >
          {label}
        </Radio>
      ))}
    </Grid>
  );
};

const Grid = styled.div<{ repeat: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.repeat}, minmax(0, 1fr));
`;

export default RadioGroup;
