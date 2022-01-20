// import cx from 'classcat';
// import React, { useRef, useEffect, useState, forwardRef } from 'react';

// const Label = ({ children, handleRemove }) => (
//   <div className="label" onClick={handleRemove}>
//     {children}
//   </div>
// );

// const SelectBase = ({
//   placeholder,
//   onClick,
//   selected,
//   loading,
//   disabled,
//   handleRemove,
//   open,
//   className,
//   ...otherProps
// }) => {
//   const valueIsSet = Array.isArray(selected) ? selected.length > 0 : !!selected;
//   const classes = cx([
//     'base',
//     { singleBase: !Array.isArray(selected) },
//     { noItems: !valueIsSet },
//     { loading: loading },
//     { disabled: disabled },
//   ]);

//   const renderValue = Array.isArray(selected)
//     ? selected.map((item) => (
//         <Label handleRemove={handleRemove(item.value)} key={item.value}>
//           {item.text}
//         </Label>
//       ))
//     : selected && selected.text;

//   return (
//     <div
//       tabIndex={0}
//       onClick={!disabled && onClick}
//       className={`${classes} ${className || ''}`}
//       {...otherProps}
//     >
//       {valueIsSet ? renderValue : placeholder}
//     </div>
//   );
// };

// const SelectMultiple = ({
//   className,
//   size,
//   loading,
//   options,
//   onChange,
//   onBlur,
//   style,
//   multiple,
//   name,
//   defaultValue,
//   value,
//   ...otherProps
// }: any) => {
//   const defaults = multiple ? [] : undefined;
//   const mainNode = useRef<HTMLDivElement>(null);
//   const [open, setOpen] = useState(false);
//   const [selected, selectItem] = useState(value || defaultValue || defaults);
//   const [filteredOptions, setOptions] = useState(options);

//   const handleClick = ({ target }) => {
//     if (mainNode.current && mainNode.current.contains(target)) return;
//     setOpen(false);
//   };

//   const handleSelect = (selectedValue) => () => {
//     selectedValue =
//       typeof selectedValue === 'string'
//         ? { value: selectedValue, text: selectedValue }
//         : selectedValue;

//     if (multiple) {
//       const value = selected.map((o) => o.value).includes(selectedValue.value)
//         ? selected.filter((item) => item.value !== selectedValue.value)
//         : selected.concat(selectedValue);

//       selectItem(value);
//     } else {
//       selectItem(selectedValue);
//       setOpen(false);
//     }
//   };

//   const toggleOpen = () => setOpen((currentState) => !currentState);

//   const handleRemove = (val) => (e) => {
//     e.stopPropagation();
//     selectItem(selected.filter((item) => item.value !== val));
//   };

//   useEffect(() => {
//     const event = {
//       target: {
//         name,
//         value: multiple
//           ? selected.map((item) => item.value)
//           : selected && selected.value,
//       },
//     };

//     if (onChange) onChange(event);
//     if (onBlur) onBlur(event);

//     document.addEventListener('mousedown', handleClick);

//     return () => {
//       document.removeEventListener('mousedown', handleClick);
//       setOptions(options);
//     };
//   }, [multiple, name, onBlur, onChange, open, options, selected]);

//   const renderOption = (option) => {
//     option =
//       typeof option === 'string' ? { text: option, value: option } : option;

//     const isSelected = multiple
//       ? selected.map((o) => o.value).includes(option.value)
//       : selected && selected.value === option.value;

//     const classes = cx({ selected: isSelected });

//     return (
//       <div
//         key={option.value}
//         onClick={handleSelect(option)}
//         className={classes}
//       >
//         {option.text}
//       </div>
//     );
//   };

//   const classes = cx([
//     'root',
//     {
//       open,
//     },
//   ]);

//   return (
//     <div className={classes} ref={mainNode} style={style}>
//       <SelectBase
//         open={open}
//         selected={selected}
//         loading={loading}
//         {...otherProps}
//         handleRemove={handleRemove}
//         onClick={toggleOpen}
//         className={className}
//       />
//       {open && (
//         <div className="picker">
//           {filteredOptions && filteredOptions.map(renderOption)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectMultiple;
export default () => null;
