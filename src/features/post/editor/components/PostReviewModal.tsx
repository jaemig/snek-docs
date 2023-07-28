import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Avatar,
  AvatarGroup,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFocusScope,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TPostReview } from '../../types/post';
import { posts } from '../../../../shared/utils/features/post';

interface IPostReviewModalProps {
  disclosure: ReturnType<typeof useDisclosure>;
}

const PostReviewModal: FC<IPostReviewModalProps> = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  const reviews: TPostReview[] = [
    {
      title: 'Review 2',
      status: 'pending',
      datetime: new Date().toLocaleDateString(),
      post: posts[0] as any, // Hacky, but we'll replace this with actual data later.
      reviewers: [
        {
          username: 'emilybrooks',
          displayName: 'Emily Brooks',
          avatarUrl:
            'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=28',
          bio: '',
          socials: []
        },
        {
          username: 'tailorjones',
          displayName: 'Tailor Jones',
          bio: '',
          avatarUrl:
            'https://unsplash.com/photos/X6Uj51n5CE8/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkwNTU1NDQ2fA&force=true&w=28',
          socials: []
        },
        {
          username: 'clairemiller',
          displayName: 'Claire Miller',
          bio: '',
          avatarUrl:
            'https://unsplash.com/photos/bqe0J0b26RQ/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkwNTU0NzA3fA&force=true&w=28',
          socials: []
        }
      ],
      comments: [
        {
          author: {
            username: 'emilybrooks',
            displayName: 'Emily Brooks',
            bio: '',
            socials: []
          },
          comment: 'This is a comment.',
          datetime: new Date().toLocaleDateString()
        }
      ]
    },
    {
      title: 'Review 1',
      status: 'rejected',
      datetime: new Date().toLocaleDateString(),
      post: posts[0] as any, // Hacky, but we'll replace this with actual data later.
      reviewers: [
        {
          username: 'emilybrooks',
          displayName: 'Emily Brooks',
          bio: '',
          socials: []
        }
      ],
      comments: [
        {
          author: {
            username: 'emilybrooks',
            displayName: 'Emily Brooks',
            bio: '',
            socials: []
          },
          comment: 'This is a comment.',
          datetime: new Date().toLocaleDateString()
        }
      ]
    }
  ];

  const memoizedReviews = useMemo(
    () =>
      reviews.map(({ title, status, reviewers }) => (
        <AccordionItem>
          <AccordionButton>
            <HStack>
              <Text flex={1}>{title}</Text>
              <AvatarGroup size="sm" max={3}>
                {reviewers.map(({ avatarUrl, username }) => (
                  <Avatar
                    key={username}
                    name={username}
                    src={avatarUrl}
                    size="sm"
                  />
                ))}
              </AvatarGroup>
            </HStack>
          </AccordionButton>
        </AccordionItem>
      )),
    [reviews]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review post feedback</ModalHeader>
        <ModalBody bgColor="shared.body.bgColor">
          <Accordion allowMultiple>{memoizedReviews}</Accordion>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostReviewModal;
