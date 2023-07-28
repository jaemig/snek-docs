import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { wait } from '../../../shared/utils/utils';
import TbBook from '../../../shared/components/icons/tabler/TbBook';
import TbBookOff from '../../../shared/components/icons/tabler/TbBookOff';

type TPublishFormValues = {
  title: string;
  summary: string;
  visibility: boolean;
};

interface IPostPublishModalProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

/**
 * Modal for publishing a post or review given feedback.
 */
const PostPublishModal: FC<IPostPublishModalProps> = ({ disclosure }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<TPublishFormValues>();
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<TPublishFormValues> = async data => {
    console.log('submitted form with values: ', data);
    await wait(5000);
    return;
    //TODO: Implement connection with Jaen
  };

  const handleClose = () => {
    disclosure.onClose();
    reset();
  };

  const visibilityOptions = [
    {
      label: 'Public',
      description: 'Anyone can see this post.',
      value: 'public',
      icon: TbBook
    },
    {
      label: 'Private',
      description: 'Only you can see this post.',
      value: 'private',
      icon: TbBookOff
    }
  ];

  const memoizedVisibilityOptions = useMemo(() => {
    return visibilityOptions.map(option => {
      const Icon = option.icon;
      return (
        <Radio
          key={option.value}
          value={option.value}
          {...register('visibility')}
        >
          <HStack gap={2} ml={2}>
            <Icon boxSize="24px" />
            <Box>
              <Text fontWeight="semibold">{option.label}</Text>
              <Text
                fontSize="sm"
                color="modals.postPublish.form.visibility.description.color"
              >
                {option.description}
              </Text>
            </Box>
          </HStack>
        </Radio>
      );
    });
  }, [visibilityOptions]);

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bgColor="shared.body.bgColor">
        <ModalHeader>Publish this post</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4} alignItems="start">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Quantum Wonders: Computing Beyond Limits"
                  {...register('title', { required: true, minLength: 3 })}
                />
                <FormErrorMessage display={errors.title ? 'block' : 'none'}>
                  This field is required
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.summary}>
                <FormLabel>Summary</FormLabel>
                <Textarea
                  placeholder="Explore the extraordinary world of quantum computers and their limitless possibilities."
                  {...register('summary', { required: true, minLength: 15 })}
                />
                <FormErrorMessage display={errors.summary ? 'block' : 'none'}>
                  This field is required
                </FormErrorMessage>
              </FormControl>
              <RadioGroup
                as={VStack}
                defaultValue={visibilityOptions[0].value}
                spacing={4}
                alignItems="flex-start"
                colorScheme="theme"
              >
                {memoizedVisibilityOptions}
              </RadioGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Tooltip
              label="This will request a review. Once it's verified, it will be published."
              openDelay={1000}
            >
              <Button
                size="sm"
                variant="filledGreen"
                type="submit"
                mr={3}
                isLoading={isSubmitting}
              >
                Publish
              </Button>
            </Tooltip>
            <Button size="sm" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PostPublishModal;
