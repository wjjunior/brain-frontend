import React from 'react';
import Flex from '../Flex';

import Checkbox from '../Checkbox';
import { grid } from '../../config/theme';

export type Option = {
  key: string;
  label: string | React.ReactNode;
};

export interface ICheckboxGroupProps {
  prefix?: string;
  options: Option[];
  selectedOptions: Option[];
  onChange: (options: Option[]) => void;
}

const CheckboxGroup: React.FC<ICheckboxGroupProps> = ({
  prefix,
  options,
  selectedOptions,
  onChange,
}) => {
  const selectedKeys = selectedOptions.map((option) => option.key);

  function onOptionClicked(option: Option) {
    if (selectedKeys.includes(option.key)) {
      onChange(
        selectedOptions.filter(
          (selectedOption) => selectedOption.key !== option.key
        )
      );
      return;
    }

    onChange([...selectedOptions, option]);
  }

  return (
    <Flex>
      {options.map(({ key, label }, index) => (
        <Checkbox
          id={(prefix || '') + key}
          key={(prefix || '') + key}
          name={(prefix || '') + key}
          label={label}
          checked={selectedKeys.includes(key)}
          onChange={() => onOptionClicked({ key, label })}
          style={{ marginRight: grid(options.length - 1 === index ? 0 : 2) }}
        />
      ))}
    </Flex>
  );
};

export default CheckboxGroup;
