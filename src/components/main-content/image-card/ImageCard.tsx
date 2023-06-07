import { FC } from 'react';
import { Box, Card, CardProps, Image, Text } from '@chakra-ui/react';
import { IMainContentComponentBaseProps } from '../../../types/mainContent/mainContent';
import Link from '../../app/Link';
import { mainComponentBaseStyle } from '../../../layout/main/mainContent.vars';
import { LinkData } from '../../../types/navigation';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { TImageData } from '../../../types/mainContent/imageCard';
import themeCardComponent from '../../../theme/components/card';

interface IImageCardProps extends IMainContentComponentBaseProps {
  image: TImageData;
  link: LinkData;
  size?: CardProps['maxW'];
}

/**
 * Component for displaying an card with an image and a link
 */
const ImageCard: FC<IImageCardProps> = ({
  baseProps,
  image,
  link,
  size = 'md'
}) => {
  return (
    <Card
      {...baseProps}
      w="fit-content"
      maxW={size}
      _hover={{
        ...themeCardComponent.variants.grayOutline.container._hover,
        'sd-cmp-image-card-link-icon': {
          marginLeft: 3
        }
      }}
      overflow="hidden"
      variant="grayOutline">
      <Link href={link.href}>
        <Image {...image} w="100%" objectFit="cover" />
        <Box p={4}>
          <Text fontSize="16px" fontWeight="semibold">
            {link.name}
            <ArrowForwardIcon
              className="sd-cmp-image-card-link-icon"
              ml={2}
              transition="margin .15s ease-in-out"
            />
          </Text>
        </Box>
      </Link>
    </Card>
  );
};

ImageCard.defaultProps = {
  baseProps: mainComponentBaseStyle.baseProps,
  image: {
    src: 'https://picsum.photos/200',
    alt: 'Placeholder image'
  },
  link: {
    href: '#',
    name: 'Placeholder link'
  }
};

export default ImageCard;
