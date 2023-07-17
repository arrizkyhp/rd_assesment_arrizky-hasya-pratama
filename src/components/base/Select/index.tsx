import { forwardRef } from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import MUISelect from '@mui/material/Select';
import type { ForwardedRef } from 'react';

import type SelectProps from './index.types';

import styles from './index.module.scss';

const Select = forwardRef(
  (props: SelectProps, forwardedRef: ForwardedRef<HTMLSelectElement>) => {
    const {
      block = false,
      classes,
      className,
      disabled = false,
      error = false,
      id,
      innerClassName,
      label,
      labelLayout = 'vertical',
      message,
      name,
      options = [],
      placeholder = 'Enter text here',
      prependObject,
      required = false,
      rounded,
      size = 'medium',
      success = false,
      type = 'text',
      value,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyUp,
    } = props || {};
    const {
      label: labelClass = '',
      container: containerClass = '',
      input: inputClass = '',
    } = classes || {};
    const selectStyle = [styles.select];
    const containerStyle = [styles.container];

    if (innerClassName) selectStyle.push(innerClassName);
    if (prependObject) selectStyle.push(styles.paddingSearch);
    if (error) containerStyle.push(styles.borderError);
    if (success) containerStyle.push(styles.borderSuccess);
    if (rounded) containerStyle.push(styles.rounded);
    if (disabled) {
      selectStyle.push(styles.disabled);
      containerStyle.push(styles.disabled);
    }
    if (block) {
      selectStyle.push(styles.block);
      containerStyle.push(styles.block);
    }
    return (
      <div
        className={`${className} ${
          labelLayout === 'horizontal' && 'flex items-center'
        }`}
      >
        {!!label && (
          <label
            htmlFor={id}
            className={`font-semibold mb-1 block text-gray-600 
              ${labelClass} ${
            labelLayout === 'horizontal' && 'mr-4 w-1/4 text-right'
          }`}
          >
            {label}
            {required && <span className="text-danger-500">*</span>}
          </label>
        )}
        <FormControl className={`${labelLayout === 'horizontal' && 'w-3/4'}`}>
          <MUISelect
            className={`${containerStyle.join(' ')} ${containerClass}`}
            classes={{ select: 'font-sans' }}
            type={type}
            value={String(value)}
            error={error}
            required={required}
            SelectDisplayProps={{
              className: `${selectStyle.join(' ')} ${inputClass}`,
            }}
            renderValue={(selected) => {
              if (!selected || selected === 'undefined') {
                return (
                  <span className="text-gray-400">
                    {placeholder || 'Choose here'}
                  </span>
                );
              }
              const selectedOptions = options.find(
                (el) => String(el.value) === selected,
              );
              return (selectedOptions && selectedOptions.label) || selected;
            }}
            displayEmpty
            margin="dense"
            size={size}
            onBlur={onBlur}
            onClick={onClick}
            onChange={onChange}
            onFocus={onFocus}
            disabled={disabled}
            ref={forwardedRef}
            name={name}
            onKeyUp={onKeyUp}
          >
            {options.map((option) => (
              <MenuItem
                value={option.value}
                classes={{ root: 'font-sans' }}
                key={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </MUISelect>
          {message && <FormHelperText error={error}>{message}</FormHelperText>}
        </FormControl>
      </div>
    );
  },
);

export default Select;
