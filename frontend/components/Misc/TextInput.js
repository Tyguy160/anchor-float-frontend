import {
  TextInputField,
  FormInputContainer,
  FormInput,
  FormError,
} from '../styles/styles';

import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormInputContainer>
      <FormInput>
        <label htmlFor={props.id || props.name}>{label}</label>
        <TextInputField className="text-input" {...field} {...props} />
      </FormInput>
      {meta.touched && meta.error ? (
        <FormError className="error">{meta.error}</FormError>
      ) : null}
    </FormInputContainer>
  );
};

export default TextInput;
