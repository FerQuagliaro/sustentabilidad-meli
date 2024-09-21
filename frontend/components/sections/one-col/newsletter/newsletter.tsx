import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Heading,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
  Box,
  Button,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CustomSelect } from './custom-select';
import { CustomCheckbox } from './custom-checkbox';
import { CircleArrowRight } from '../../../icons/circle-arrow-right';
import { RichText } from '../../../text/rich-text';
import { Loading } from '../../../loading';
import { ThankYou } from './thank-you';

interface DefaultInputProps {
  label: string;
  errorMsg: string;
}

interface NewsletterProps {
  title: string;
  subTitle: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  nameInput: DefaultInputProps;
  selectInput: {
    label: string;
    errorMsg: string;
    options: string[];
  };
  emailInput: DefaultInputProps;
  termsInput: DefaultInputProps;
}

export const Newsletter: React.FC<NewsletterProps> = (props) => {
  const {
    title,
    subTitle,
    successTitle,
    successMessage,
    errorMessage,
    nameInput,
    selectInput,
    emailInput,
    termsInput,
  } = props;

  const router = useRouter();
  const { locale } = router;
  const [loading, showLoading] = useState(false);
  const [success, showSuccess] = useState(false);
  const [error, showError] = useState(false);

  //fields unique id's
  const nameInputID = 'name';
  const selectInputID = 'whoAreYou';
  const emailInputID = 'email';
  const checkBoxInputID = 'termsAndConditions';

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    showLoading(true);

    const data = {
      ...formData,
      locale,
    };

    try {
      await axios.post(`/api/subscribe`, data);
      showLoading(false);
      showSuccess(true);
    } catch (e) {
      showLoading(false);
      showError(true);
    }
  };

  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Container
      centerContent
      width="100%"
      maxWidth={{ base: 'container.mobile.lg', md: 'container.desktop.sm' }}
    >
      <Flex as="header" width="100%" flexDirection="column" alignItems="center">
        <Heading
          as="h2"
          textAlign="center"
          fontSize={{ base: '40', lg: '80' }}
          lineHeight="40"
          marginBottom={{ base: '1em' }}
        >
          <RichText txt={title} />
        </Heading>
        {!success && (
          <Text
            textAlign="center"
            fontSize={{ base: '20' }}
            lineHeight="20"
            color="meli.black"
            marginBottom={{ base: '1.5em' }}
          >
            {subTitle}
          </Text>
        )}
      </Flex>
      <Container
        maxW={{ base: 'container.mobile.lg', md: 'container.desktop.xs' }}
      >
        {!success && (
          <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FormControl isInvalid={errors[nameInputID]}>
              <Box
                as="label"
                htmlFor={nameInputID}
                border={0}
                clipPath="rect(1px, 1px, 1px, 1px)"
                height="1px"
                margin="-1px"
                overflow="hidden"
                padding={0}
                position="absolute"
                width="1px"
              >
                {nameInput.label}
              </Box>
              <Input
                id={nameInputID}
                type="text"
                border="1px solid var(--chakra-colors-meli-grey) !important"
                borderRadius="meli.sm"
                height="65px"
                color="black"
                textAlign="center"
                fontSize="16"
                placeholder={nameInput.label}
                _placeholder={{ color: 'meli.grey' }}
                {...register(nameInputID, {
                  required: nameInput.errorMsg,
                })}
                _focus={{
                  _placeholder: {
                    color: 'transparent',
                  },
                  border:
                    '2px solid var(--chakra-colors-meli-black) !important',
                  caretColor: 'var(--chakra-colors-meli-yellow)',
                  colors: 'var(--chakra-colors-meli-black)',
                }}
              />
              <FormErrorMessage>
                {errors[nameInputID] && errors[nameInputID].message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors[selectInputID]} margin="1em 0">
              <Box
                as="label"
                htmlFor={selectInputID}
                border={0}
                clipPath="rect(1px, 1px, 1px, 1px)"
                height="1px"
                margin="-1px"
                overflow="hidden"
                padding={0}
                position="absolute"
                width="1px"
              >
                {selectInput.label}
              </Box>
              <CustomSelect
                fieldId={selectInputID}
                placeHolder={selectInput.label}
                title={selectInput.label}
                options={selectInput.options}
                errorMsg={selectInput.errorMsg}
                register={register}
                setValue={setValue}
              />
              <FormErrorMessage>
                {errors[selectInputID] && errors[selectInputID].message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              marginBottom={{ base: '1em', lg: '3em' }}
              isInvalid={errors[emailInputID]}
            >
              <Box
                as="label"
                htmlFor={emailInputID}
                border={0}
                clipPath="rect(1px, 1px, 1px, 1px)"
                height="1px"
                margin="-1px"
                overflow="hidden"
                padding={0}
                position="absolute"
                width="1px"
              >
                {emailInput.label}
              </Box>
              <Input
                id={emailInputID}
                type="email"
                border="1px solid var(--chakra-colors-meli-grey) !important"
                borderRadius="meli.sm"
                height="65px"
                color="black"
                textAlign="center"
                fontSize="1rem"
                placeholder="Email"
                _placeholder={{ color: 'meli.grey' }}
                {...register(emailInputID, {
                  required: emailInput.errorMsg,
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: emailInput.errorMsg,
                  },
                })}
                _focus={{
                  _placeholder: {
                    color: 'transparent',
                  },
                  border:
                    '2px solid var(--chakra-colors-meli-black) !important',
                  caretColor: 'var(--chakra-colors-meli-yellow)',
                  colors: 'var(--chakra-colors-meli-black)',
                }}
              />
              <FormErrorMessage>
                {errors[emailInputID] && errors[emailInputID].message}
              </FormErrorMessage>
            </FormControl>
            <Flex
              width="100%"
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems="center"
              justifyContent={{ base: 'center', md: 'space-between' }}
            >
              <FormControl
                isInvalid={errors[checkBoxInputID]}
                marginBottom={{ base: 8, md: 0 }}
              >
                <Box
                  as="label"
                  htmlFor={checkBoxInputID}
                  border={0}
                  clipPath="rect(1px, 1px, 1px, 1px)"
                  height="1px"
                  margin="-1px"
                  overflow="hidden"
                  padding={0}
                  position="absolute"
                  width="1px"
                >
                  {termsInput.label}
                </Box>
                <CustomCheckbox
                  fieldId={checkBoxInputID}
                  register={register}
                  setValue={setValue}
                  text={termsInput.label}
                  errorMsg={termsInput.errorMsg}
                />
                <FormErrorMessage position="absolute">
                  {errors[checkBoxInputID] && errors[checkBoxInputID].message}
                </FormErrorMessage>
              </FormControl>

              {isDesktop ? (
                <Box
                  id="submit-btn"
                  as="button"
                  type="submit"
                  aria-label="subscribe to newsletter"
                  position="relative"
                >
                  <CircleArrowRight
                    color="meli.black"
                    width="60px"
                    height="60px"
                    position="relative"
                    zIndex={10}
                  />
                </Box>
              ) : (
                <Button
                  id="submit-btn"
                  type="submit"
                  aria-label="subscribe to newsletter"
                  variant="yellow"
                  w="full"
                >
                  {locale === 'pt'
                    ? 'Mandar'
                    : locale === 'en'
                    ? 'Send'
                    : 'Enviar'}
                </Button>
              )}
            </Flex>

            {error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
          </Box>
        )}

        {success && <ThankYou title={successTitle} excerpt={successMessage} />}

        <Loading show={loading} size="lg" variant="fullscreen" overlay />
      </Container>
    </Container>
  );
};
