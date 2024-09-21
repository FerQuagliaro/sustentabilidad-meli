import React, { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { CheckboxEmpty } from '../../../icons/checkbox-empty';
import { CheckboxFull } from '../../../icons/checkbox-full';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form/dist/types';

interface CustomCheckboxProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  fieldId: string;
  text: string;
  errorMsg: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  fieldId,
  text,
  errorMsg,
  register,
  setValue,
}) => {
  const [checked, setChecked] = useState(false);

  function handleClick() {
    setChecked((currentValue) => {
      const newValue = !currentValue;
      setValue(fieldId, newValue, { shouldValidate: true });
      return newValue;
    });
  }

  return (
    <Flex onClick={() => handleClick()} alignItems="center" cursor="pointer">
      <input
        id={fieldId}
        type="checkbox"
        checked={checked}
        readOnly
        style={{
          border: '0',
          clipPath: 'rect(1px, 1px, 1px, 1px)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          position: 'absolute',
          width: '1px',
        }}
        {...register(fieldId, { required: errorMsg })}
      />
      {checked ? <CheckboxFull /> : <CheckboxEmpty />}
      <Text
        marginLeft="1em"
        userSelect="none"
        fontSize={{ base: '0.875rem' }}
        fontWeight={checked ? 700 : 400}
        color="#333"
      >
        {text}
      </Text>
    </Flex>
  );
};
