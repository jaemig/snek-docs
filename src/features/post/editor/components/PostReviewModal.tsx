import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFocusScope,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { FC } from 'react';

interface IPostReviewModalProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

const PostReviewModal: FC<IPostReviewModalProps> = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  const reviews = {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review post feedback</ModalHeader>
        <ModalBody bgColor="shared.body.bgColor">
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton></AccordionButton>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostReviewModal;
