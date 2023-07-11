import {
  Badge,
  Box,
  Button,
  Card,
  CardProps,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import Link from '../core/Link';
import TbStar from '../icons/tabler/TbStar';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * Component for displaying a post preview.
 */

interface IPostPreviewProps {
  publicationDate: string;
  title: string;
  summary: string;
  likes: number;
  url: string;
  canManage?: boolean;
  wrapperProps?: CardProps;
}

const PostPreview: FC<IPostPreviewProps> = ({
  publicationDate,
  title,
  summary,
  likes,
  url,
  canManage,
  wrapperProps
}) => {
  return (
    // Two possible ways to handle y overflow:
    // 1) Use overflow="hidden" and textOverflow="ellipsis" on the Card component
    // 2) Cut off the text on the server side (easier way)
    <Card
      variant="outline"
      p={5}
      borderRadius="xl"
      // overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        transform: 'scale(1.01)',
        boxShadow: 'md',
        h5: {
          color: 'theme.500'
        }
      }}
      transition="all 0.2s cubic-bezier(.17,.67,.83,.67)"
      {...wrapperProps}
    >
      {/* <Badge
        colorScheme="yellow"
        position="absolute"
        top={0}
        right="50%"
        borderRadius="full"
        px={3}
        py={0.5}
        transform="translateY(-50%)"
      >
        <TbStar />
        1.3k
      </Badge> */}
      {/* <IconButton
        position="absolute"
        top={0}
        right={0}
        icon={<SearchIcon />}
        aria-label="Search"
        size="sm"
      /> */}
      <HStack>
        <Box flex={1}>
          <Text fontSize={12} color="gray.400">
            {publicationDate}
          </Text>
          <Heading
            as="h5"
            size="sm"
            transition="color 0.2s ease-in-out"
            display="inline"
          >
            {title}
          </Heading>
          <Text fontSize={12} color="gray.300" display="inline">
            <TbStar />
            1.3k
          </Text>
        </Box>
      </HStack>
      <Text mt={2} flexGrow={1}>
        {summary}
      </Text>
      <Button
        as={Button}
        mt={3}
        ml="auto"
        size="sm"
        colorScheme="theme"
        variant="outline-hover-filled"
      >
        Read post
      </Button>
    </Card>
  );
};

export default PostPreview;
