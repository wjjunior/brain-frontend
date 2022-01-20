import React, { useEffect, useRef } from 'react';
import { grid } from '../config/theme';

import TextField, { ITextFieldProps } from './TextField';

const TextArea = React.forwardRef<HTMLInputElement, ITextFieldProps>(
  (props, ref) => {
    const textAreaRef = ref || useRef<HTMLInputElement>(null);

    const resize = (element: HTMLInputElement) => {
      element.style.minHeight = 'auto';
      element.style.minHeight = Math.min(element.scrollHeight, 8 * 16) + 'px';
    };

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      resize(e.target);

      if (typeof props.onChange === 'function') {
        props.onChange(e);
      }
    }

    useEffect(() => {
      if (typeof textAreaRef === 'function') return;

      if (textAreaRef.current) {
        resize(textAreaRef.current);
      }
    }, [textAreaRef, ref, props.value]);

    return (
      <TextField
        {...props}
        ref={textAreaRef}
        textarea
        onChange={onChange}
        rows={props.rows || '1'}
        style={{
          ...(props.style || {}),
          maxHeight: grid(16),
          resize: 'vertical',
          overflowY: 'auto',
        }}
      />
    );
  }
);

export default TextArea;
