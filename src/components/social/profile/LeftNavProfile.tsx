import {
  Avatar,
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  IconProps,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC, ReactNode, useMemo } from 'react';
import LeftNav, { ILeftNavProps } from '../../../layout/navigation/LeftNav';
import FeatherInbox from '../../icons/feather/FeatherInbox';
import TbBuilding from '../../icons/tabler/TbBuilding';
import TbLinkedIn from '../../icons/tabler/TbLinkedIn';
import TbMapPin from '../../icons/tabler/TbMapPin';
import Link from '../../core/Link';

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
      'https://unsplash.com/photos/O3ymvT7Wf9U/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg4ODIyMTE1fA&force=true&w=320',
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

  const memoizedSocialLink = useMemo(() => {
    return userData.socialLinks.map(({ type, label, url }) => {
      const IconComp = socialLinkIcons[type as TSocialLink];
      return (
        <>
          <GridItem>
            <IconComp
              strokeWidth={2.2}
              boxSize="16px"
              color="pages.userProfile.leftNav.socialLinks.icon.color"
            />
          </GridItem>
          <GridItem>
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
        </>
      );
    });
  }, [userData.socialLinks]);

  return (
    <LeftNav
      hideControls={hideControls}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    >
      <VStack
        alignItems="start"
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1'
          }
        }}
      >
        <Avatar
          width="full"
          h="max-content"
          name="Emily Brooks"
          src="https://unsplash.com/photos/O3ymvT7Wf9U/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg4ODIyMTE1fA&force=true&w=320"
          aspectRatio={1}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
        />
        <VStack alignItems="Start" spacing={0}>
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
        <Grid templateColumns="22px 1fr" gap={1} mt={5}>
          {memoizedSocialLink}
        </Grid>
      </VStack>
    </LeftNav>
  );
};

export default LeftNavProfile;
