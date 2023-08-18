import { FC } from 'react';
import {
  Box,
  Center,
  Image as ChImage,
  ImageProps as ChImageProps
} from '@chakra-ui/react';
import TbPhotoEdit from '../icons/tabler/TbPhotoEdit';

interface ImageProps extends ChImageProps {
  editable?: boolean;
}

/**
 * (Static) Image component that can not be edited using Jaen.
 */
const Image: FC<ImageProps> = ({ editable, ...props }) => {
  const image = <ChImage {...props} />;
  if (!editable) {
    return image;
  }

  //TODO: Background color should be themeable (we probably need a separate color layer for this)
  return (
    <Box
      position="relative"
      __css={{
        '&:hover': {
          '.image-edit-icon-container': {
            opacity: 1
          },
          img: {
            transform: 'scale(1.05)'
          }
        }
      }}
    >
      {image}
      <Center
        className="image-edit-icon-container"
        position="absolute"
        top={0}
        left={0}
        boxSize="full"
        bgColor="components.image.edit.container.bgColor"
        opacity={0}
        transition="opacity 0.2s ease-in-out"
      >
        <TbPhotoEdit fontSize="3xl" color="white" />
      </Center>
    </Box>
  );
};

export default Image;
