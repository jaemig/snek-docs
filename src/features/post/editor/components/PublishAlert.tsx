import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';

interface IPublishAlertProps {
  disclosure: ReturnType<typeof useDisclosure>;
  publish: () => Promise<void>;
}

/**
 * Alert that is displayed when the user tries to publish a post.
 */
const PublishAlert: FC<IPublishAlertProps> = ({ disclosure, publish }) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { isOpen, onClose } = disclosure;

  const handleConfirmation = async () => {
    setIsPublishing(true);
    await publish();
    setIsPublishing(false);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Publish this post?</AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to publish this post? This post will be visible
          to everyone.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="filledGreen"
            ml={3}
            isLoading={isPublishing}
            onClick={handleConfirmation}
          >
            Publish
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishAlert;
