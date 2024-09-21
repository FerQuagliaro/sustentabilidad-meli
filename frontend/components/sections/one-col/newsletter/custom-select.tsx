import { Box, Flex, Text } from '@chakra-ui/react';
import { CaretDown } from '../../../icons/caret-down';
import { useState, useRef, useEffect } from 'react';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form/dist/types';

interface CustomSelectProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  placeHolder: string;
  fieldId: string;
  title: string;
  options: string[];
  errorMsg: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  register,
  setValue,
  placeHolder,
  fieldId,
  title,
  options,
  errorMsg,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  function handleSelected(option: string) {
    setSelected(option);
    setIsOpen(false);
    setValue(fieldId, option, { shouldValidate: true });
  }

  useEffect(() => {
    function checkIfOpen(e: globalThis.MouseEvent) {
      if (
        isOpen &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('click', checkIfOpen);
    }

    return () => {
      document.removeEventListener('click', checkIfOpen);
    };
  }, [isOpen]);

  return (
    <Box id={fieldId} {...register(fieldId, { required: errorMsg })}>
      {!isOpen ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          position="relative"
          border="1px solid var(--chakra-colors-meli-grey) !important"
          borderRadius="meli.sm"
          height="65px"
          cursor="pointer"
          onClick={() => setIsOpen(true)}
        >
          <Text
            fontSize="16"
            textAlign="center"
            cursor="pointer"
            color={selected !== '' ? 'meli.black' : 'meli.grey'}
          >
            {selected !== '' ? selected : placeHolder}
          </Text>
          <CaretDown
            position="absolute"
            right="0"
            top="0"
            transform="translate(-120%, 150%)"
            boxSize={4}
          />
        </Flex>
      ) : (
        <Flex
          ref={optionsRef}
          border="2px solid var(--chakra-colors-meli-black) !important"
          borderRadius="meli.sm"
          padding="19px"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            width="100%"
            position="relative"
            onClick={() => handleSelected('')}
          >
            <Text
              fontWeight="regular"
              textAlign="center"
              cursor="pointer"
              color="meli.grey"
            >
              {title}
            </Text>
            <CaretDown
              boxSize={4}
              position="absolute"
              right={0}
              top={0}
              transform="translateY(30%) rotate(180deg)"
            />
          </Box>
          {options.map((option, i) => (
            <Text
              key={option}
              fontSize="16"
              color="meli.grey"
              marginTop="1.5em"
              cursor="pointer"
              _hover={{ fontWeight: 'bold', color: 'meli.black' }}
              onClick={() => handleSelected(option)}
            >
              {option}
            </Text>
          ))}
        </Flex>
      )}
    </Box>
  );
};
