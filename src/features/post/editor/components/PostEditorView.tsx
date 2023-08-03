import { Stack, Input, Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import MdxEditor from '../../../../shared/components/MdxEditor';
import { variantFontSizes } from '../../../main-content/heading/components/Heading';
import LeftNavPostEditor from './LeftNavPostEditor';
/**
 * Component for editing a post.
 */
const PostEditorView: FC = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <>
      <LeftNavPostEditor />
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box w="full">
          <Box
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '2px',
              height: isInputFocused ? '60%' : 0,
              background: 'theme.500',
              transform: 'translateY(-50%)',
              transition: 'height 0.2s ease-in-out'
            }}
            _hover={{
              _after: {
                height: isInputFocused ? '60%' : '35%'
              }
            }}
            pl={2}
            mb={5}
          >
            <Input
              position="relative"
              variant="unstyled"
              placeholder="Post Title"
              fontSize={variantFontSizes.h1}
              fontWeight="bold"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </Box>
          <MdxEditor />
        </Box>
      </Stack>
    </>
  );
};

export default PostEditorView;
