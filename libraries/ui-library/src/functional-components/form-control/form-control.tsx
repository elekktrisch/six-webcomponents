import { h, VNode } from '@stencil/core';

export interface FormControlProps {
  /** The input id, used to map the input to the label */
  inputId: string;

  /** The size of the form control */
  size: 'small' | 'medium' | 'large';

  /** The label id, used to map the label to the input */
  labelId?: string;

  /** The label text (if the label slot isn't used) */
  label?: string;

  /** Whether a label slot has been provided. */
  hasLabelSlot?: boolean;

  /** The help text id, used to map the input to the help text */
  helpTextId?: string;

  /** The help text (if the help-text slot isn't used) */
  helpText?: string;

  /** Whether a help text slot has been provided. */
  hasHelpTextSlot?: boolean;

  /** The error text id, used to map the input to the help text */
  errorTextId?: string;

  /** The error text */
  errorText?: string;

  /** Set to true to disable the input. */
  disabled?: boolean;

  /** Set if the value is required. */
  required?: boolean;

  /** Set if the error text is displayed. */
  displayError?: boolean;

  /** A function that gets called when the label is clicked. */
  onLabelClick?: (event: MouseEvent) => void;
}

const FormControl = (props: FormControlProps, children: VNode[]) => {
  const hasLabel = props.label != null && props.label.trim() !== '' ? true : props.hasLabelSlot ?? false;
  const hasHelpText = props.helpText != null && props.helpText.trim() !== '' ? true : props.hasHelpTextSlot ?? false;

  return (
    <div
      part="form-control"
      class={{
        'form-control': true,
        'form-control--small': props.size === 'small',
        'form-control--medium': props.size === 'medium',
        'form-control--large': props.size === 'large',
        'form-control--has-label': hasLabel,
        'form-control--has-help-text': hasHelpText,
        'form-control--has-error-text': props.displayError ?? false,
        'form-control--disabled': props.disabled ?? false,
        'form-control--invalid': (props.displayError ?? false) && !props.disabled,
      }}
    >
      <label
        part="label"
        id={props.labelId}
        class={{
          'form-control__label': true,
          'form-control__label__required': props.required ?? false,
        }}
        htmlFor={props.inputId}
        aria-hidden={hasLabel ? 'false' : 'true'}
        onClick={props.onLabelClick}
      >
        <slot name="label">{props.label}</slot>
      </label>

      <div class="form-control__input">{children}</div>

      <div
        part="error-text"
        id={props.errorTextId}
        class="form-control__error-text"
        aria-hidden={props.displayError ? 'false' : 'true'}
      >
        {props.errorText}
      </div>

      <div
        part="help-text"
        id={props.helpTextId}
        class="form-control__help-text"
        aria-hidden={hasHelpText ? 'false' : 'true'}
      >
        <slot name="help-text">{props.helpText}</slot>
      </div>
    </div>
  );
};

export default FormControl;
