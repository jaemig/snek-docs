import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
  Tooltip,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { wait } from '../../../shared/utils/utils';
import TbInfoCircle from '../../../shared/components/icons/tabler/TbInfoCircle';

type TPublishFormValues = {
  title: string;
  summary: string;
  isPrivate: boolean;
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
    await wait(50000);
    return;
    //TODO: Implement connection with Jaen
  };

  const handleClose = () => {
    disclosure.onClose();
    reset();
  };

  return (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Publish Post</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4}>
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
              <FormControl>
                <FormLabel>
                  Make Private
                  <Tooltip
                    placement="right"
                    label="This will make the post private. Only you will be able to see it."
                    borderRadius="md"
                    openDelay={200}
                  >
                    <IconButton
                      icon={<TbInfoCircle />}
                      aria-label="Info"
                      size="sm"
                      variant="ghost-hover-opacity"
                      p={0}
                      boxSize="24px"
                    />
                  </Tooltip>
                </FormLabel>
                <Switch colorScheme="theme" {...register('isPrivate')} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Tooltip
              label="This will request a review. Once it's verified, it will be published."
              borderRadius="md"
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
