import {
  Avatar,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconProps,
  Text,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { FC, Fragment, useMemo } from 'react';
import LeftNav, { ILeftNavProps } from '../../../layout/navigation/LeftNav';
import FeatherInbox from '../../../shared/components/icons/feather/FeatherInbox';
import TbBuilding from '../../../shared/components/icons/tabler/TbBuilding';
import TbLinkedIn from '../../../shared/components/icons/tabler/TbLinkedIn';
import TbMapPin from '../../../shared/components/icons/tabler/TbMapPin';
import Link from '../../../shared/components/Link';
import { useNavOffset } from '../../../shared/hooks/use-nav-offset';

export type TSocialLink = 'email' | 'linkedin' | 'location' | 'company';

interface ILeftNavProfileProps extends ILeftNavProps {}

/**
 * Sub-component of the profile page that displays the key information about the user.
 */
const LeftNavProfile: FC<ILeftNavProfileProps> = ({
  hideControls,
  isExpanded,
  setIsExpanded
}) => {
  const socialLinkIcons: { [key in TSocialLink]: FC<IconProps> } = {
    email: FeatherInbox,
    linkedin: TbLinkedIn,
    location: TbMapPin,
    company: TbBuilding
  };
  //* This would be the data that comes from Jaen.
  const userData = {
    name: 'Emily Brooks',
    username: 'emilybrooks',
    location: 'San Francisco, CA',
    company: 'Snek',
    avatarUrl:
      'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024',
    bio: "Adventurous spirit with a knack for words and a passion for knowledge. Exploring the world of academia, one document at a time. Forever curious, forever learning. Let's dive into the realm of information together uncover the wonders of education.",
    socialLinks: [
      {
        type: 'company',
        label: 'Snek',
        url: 'https://snek.at'
      },
      {
        type: 'email',
        label: 'emily.brooks@snek.at',
        url: 'mailto:emily.brooks@snek.at'
      },
      {
        type: 'linkedin',
        label: 'Emily-Brooks',
        url: 'https://www.linkedin.com/in/emily-brooks-1a2b3c4d/'
      },
      {
        type: 'location',
        label: 'San Francisco, CA'
      }
    ]
  };

  const navTopOffset = useNavOffset();

  const hideControlsFallback = useBreakpointValue({ base: true, md: false });

  const memoizedSocialLink = useMemo(() => {
    return userData.socialLinks.map(({ type, label, url }, idx) => {
      const IconComp = socialLinkIcons[type as TSocialLink];
      return (
        <Fragment key={idx}>
          <GridItem
            as={HStack}
            verticalAlign="middle"
            gap={{ base: 0.5, md: 2 }}
            // We currently only display the email link on mobile.
            display={{ base: type !== 'email' ? 'none' : 'flex', md: 'flex' }}
          >
            <IconComp
              strokeWidth={2.2}
              h="full"
              color="pages.userProfile.leftNav.socialLinks.icon.color"
            />
            {url ? (
              <Link
                href={'url'}
                _hover={{
                  color:
                    'pages.userProfile.leftNav.socialLinks.text.hover.color'
                }}
                transition="color 0.2s ease-in-out"
              >
                {label}
              </Link>
            ) : (
              <Text cursor="default">{label}</Text>
            )}
          </GridItem>
        </Fragment>
      );
    });
  }, [userData.socialLinks]);

  return (
    <LeftNav
      hideControls={hideControls ?? hideControlsFallback}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      h={{
        base: 'max-content',
        md: `calc(100vh - 100px - ${navTopOffset})`
      }}
      minH="fit-content"
      mb={{ base: 10, md: 0 }}
    >
      <VStack
        alignItems={{ base: 'center', md: 'start' }}
        textAlign={{ base: 'center', md: 'left' }}
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1',
            objectPosition: 'top' //? Maybe we can make this configurable
          }
        }}
      >
        <Avatar
          width={{
            base: '150px',
            md: 'full'
          }}
          h="max-content"
          name="Emily Brooks"
          src="https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024"
          aspectRatio={1}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
        />
        <VStack alignItems={{ base: 'center', md: 'start' }} spacing={0}>
          <Heading as="h6" fontSize="24px" mt={2}>
            {userData.name}
          </Heading>
          <Text
            fontSize="14px"
            color="pages.userProfile.leftNav.username.color.inactive"
            _hover={{
              color: 'pages.userProfile.leftNav.username.color.hover'
            }}
            transition="color 0.2s ease-in-out"
            cursor="pointer"
          >
            @{userData.username}
          </Text>
          {
            //* Maybe this would be a neat place to put the total amount of favs/likes, etc (some kind of stats)
          }
          <Divider mt={4} />
          <Text mt={2}>{userData.bio}</Text>
        </VStack>
        <Divider mt={2} />
        <Grid
          templateColumns={{ base: 'repeat(4, auto)', md: '1fr' }}
          gap={{ base: 4, md: 1 }}
          my={{ base: 2, md: 5 }}
        >
          {memoizedSocialLink}
        </Grid>
      </VStack>
    </LeftNav>
  );
};

export default LeftNavProfile;
