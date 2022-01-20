import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import cc from 'classcat';
import { AutoSizer, List } from 'react-virtualized';
import {
  RovingTabIndexProvider,
  useRovingTabIndex,
  useFocusEffect,
} from 'react-roving-tabindex';

import Card from './Card';
import Flex from './Flex';
import { H6 } from './Typography';
import { OutlineButton } from './Button';
import { escapeRegExp, themeGrid, themeProp } from '../utils/functional';
import Input from './Input';

export type Option = {
  key: string;
  label: string;
  tag?: string;
};

export interface ISelectProps {
  id?: string;
  selectedOptions: Option[];
  options: Option[];
  placeholder: string;
  searchable?: boolean;
  multiple?: boolean;
  searchPlaceHolder?: string;
  displayedText?: React.ReactNode;
  style?: any;
  maxWidth?: string;
  tabIndex?: number;
  required?: boolean;
  disabled?: boolean;
  onSearchChange?: (term: string) => void;
  onChange: (options: Option[]) => void;
}

const Select: React.FC<ISelectProps> = ({
  style,
  options,
  selectedOptions,
  placeholder,
  searchable,
  multiple,
  maxWidth,
  searchPlaceHolder,
  displayedText,
  tabIndex,
  required,
  disabled,
  onSearchChange,
  onChange,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpenState] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [optionsCardOffset, setOptionsCardOffset] = useState<number>(40);

  const currentKeys = selectedOptions.map((option) => option.key);

  function isItemSelected(option: Option): boolean {
    return currentKeys.includes(option.key);
  }

  function onOptionClicked(option: Option) {
    setSearchTerm('');

    if (!multiple) {
      setOpenState(false);
    }

    if (option.key === 'clear-selection') {
      return onChange([]);
    }

    if (isItemSelected(option)) {
      if (!multiple) return;

      return onChange(
        selectedOptions.filter(
          (selectedOption) => selectedOption.key !== option.key
        )
      );
    }

    onChange(multiple ? [...selectedOptions, option] : [option]);
  }

  function openIfClosed() {
    if (!isOpen && !disabled) {
      setOpenState(true);

      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 50);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (target && typeof onSearchChange === 'function') {
      onSearchChange(target.value);
    }

    setSearchTerm(target.value);
  }

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (
        selectRef.current &&
        selectRef.current.contains(event.target as Node | null)
      )
        return;

      if (isOpen) {
        setOpenState(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('click', onDocumentClick);

    return () => document.removeEventListener('click', onDocumentClick);
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    searchTerm
      ? new RegExp(escapeRegExp(searchTerm), 'gi').test(option.label)
      : true
  );

  if (!multiple && !!placeholder && !required) {
    filteredOptions.unshift({
      key: 'clear-selection',
      label: placeholder,
    });
  }

  const buttonDisplayedText = displayedText
    ? displayedText
    : currentKeys.length
    ? multiple
      ? currentKeys.length + ' selected'
      : selectedOptions[0].label
    : placeholder;

  useLayoutEffect(() => {
    const button = buttonRef.current;

    if (button) {
      if (button.clientHeight !== optionsCardOffset) {
        setOptionsCardOffset(button.clientHeight);
      }
    }
  }, [buttonDisplayedText, optionsCardOffset]);

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    openIfClosed();
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpenState(false);
    }
  }

  return (
    <SelectInputWrapper
      style={style}
      ref={selectRef}
      tabIndex={tabIndex || 0}
      onFocusCapture={onFocus}
      onBlur={onBlur}
    >
      {/* <input readOnly onFocus={onFocus} /> */}
      <SelectInputButton
        ref={buttonRef}
        justify="space-between"
        className={cc({ disabled })}
        onClick={() => openIfClosed()}
      >
        <H6
          truncateText
          className={cc({ selected: !!currentKeys.length })}
          style={{ maxWidth: maxWidth ? maxWidth : 'none' }}
        >
          {buttonDisplayedText}
        </H6>
        <SelectArrow />
      </SelectInputButton>
      {isOpen && (
        <Card
          as="ul"
          flex="1"
          style={{
            marginTop: optionsCardOffset,
          }}
        >
          {searchable && (
            <Input
              ref={searchRef}
              placeholder={searchPlaceHolder}
              value={searchTerm}
              onChange={onInputChange}
            />
          )}
          <div className="scrollable">
            <RovingTabIndexProvider direction="vertical">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    rowHeight={30}
                    overscanRowCount={5}
                    rowCount={filteredOptions.length}
                    className="virtualized-list"
                    width={width}
                    tabIndex={-1}
                    height={Math.min(filteredOptions.length * 30, 176)}
                    rowRenderer={({ index, key, style }) => {
                      const option = filteredOptions[index];

                      return (
                        <SelectItem
                          key={key}
                          style={{ ...style, maxWidth: width - 10 }}
                          className={cc({
                            active: isItemSelected(option),
                            placeholder: option.key === 'clear-selection',
                            tagged: !!option.tag,
                          })}
                          onClick={() => onOptionClicked(option)}
                        >
                          {option.label}{' '}
                          {!!option.tag && <Tag>{option.tag}</Tag>}
                        </SelectItem>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            </RovingTabIndexProvider>
          </div>
        </Card>
      )}
    </SelectInputWrapper>
  );
};

const Tag = styled.span`
  background-color: ${themeProp('colors.primary.purple')};
  color: ${themeProp('colors.primary.white')};
  padding: ${themeGrid(0.25)} ${themeGrid(0.5)};
  border-radius: ${themeGrid(0.5)};
  font-size: ${themeGrid(1.25)};
  text-transform: uppercase;
`;

const SelectArrow = styled.div`
  &:after {
    border: solid ${themeProp('colors.primary.transparent')};
    content: '';
    height: 0;
    width: 0;
    pointer-events: none;
    border-color: ${themeProp('colors.primary.transparent')};
    border-top-color: ${themeProp('colors.primary.purple')};
    border-width: ${themeGrid(0.75)};
    margin-left: -${themeGrid(0.75)};
  }
`;

const SelectItem: React.FC<React.HTMLAttributes<HTMLLIElement>> = (props) => {
  // The ref of the input to be controlled.
  const ref = useRef<HTMLLIElement>(null);

  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    false
  );

  // Use some mechanism to set focus on the button if it gets focus.
  // In this case I use the included useFocusEffect hook:
  useFocusEffect(focused, ref);

  return (
    <StyledSelectItem
      {...props}
      ref={ref}
      tabIndex={tabIndex}
      onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
        handleKeyDown(e);

        if (e.which === 32 && typeof props.onClick === 'function') {
          props.onClick(e as any);
        }
      }}
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        handleClick();

        if (typeof props.onClick === 'function') {
          props.onClick(e);
        }
      }}
    />
  );
};

const StyledSelectItem = styled.li`
  cursor: pointer;
  padding: ${themeGrid(1)} ${themeGrid(2)};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:first-of-type {
    border-radius: ${themeGrid(0.2)} ${themeGrid(0.2)} 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 ${themeGrid(0.2)} ${themeGrid(0.2)};
  }

  &:hover,
  &:focus,
  &:active {
    background-color: ${themeProp('colors.secondary.silver')};
  }

  &.tagged,
  &.placeholder {
    color: ${themeProp('colors.secondary.gray')};
  }

  &.active {
    color: ${themeProp('colors.primary.gray')};
    background-color: ${themeProp('colors.secondary.purple')};
  }
`;

const SelectInputButton = styled(OutlineButton)`
  border: 1px solid ${themeProp('colors.primary.silver')};
  padding: ${themeGrid(1.25)} ${themeGrid(2.25)};
  max-height: ${themeGrid(4.75)};

  flex: 1;
  min-width: 0;

  ${H6} {
    color: ${themeProp('colors.secondary.gray')};

    &.selected {
      color: ${themeProp('colors.primary.gray')};
    }
  }

  ${SelectArrow} {
    padding-top: ${themeGrid(1.65)};
    padding-left: ${themeGrid(1.5)};
  }

  &:hover,
  &:focus,
  &:active {
    border-color: ${themeProp('colors.primary.silver')};
    background-color: ${themeProp('colors.primary.white')};

    ${H6}:not(.selected) {
      color: ${themeProp('colors.secondary.gray')};
    }

    ${SelectArrow} {
      border-color: ${themeProp('colors.primary.purple')};
    }
  }

  &.disabled {
    cursor: not-allowed;
    border-color: ${themeProp('colors.primary.silver')};
    background-color: ${themeProp('colors.primary.silver')};
  }
`;

const SelectInputWrapper = styled(Flex)`
  position: relative;

  > input {
    visibility: none;
    opacity: 0;
    width: 0;
    height: 0;
  }

  ${Input} {
    border-radius: 0;
  }

  ul${Card} {
    z-index: 5;
    padding: 0;
    width: 100%;
    position: absolute;
    box-shadow: 0 2px 8px 0 ${themeProp('colors.secondary.gray')};
  }

  ${SelectInputButton} {
    z-index: 0;
  }
`;

export default Select;
