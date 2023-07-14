import {
  Box,
  Flex,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import {
  TActivitySection,
  TActivityType
} from '../../../types/features/activity';
import { TStepperSection } from '../../../types/core/stepper';
import Stepper from '../../core/stepper/Stepper';
import TbPencil from '../../icons/tabler/TbPencil';
import TbMessagesCircle2 from '../../icons/tabler/TbMessagesCircle2';
import TbStar from '../../icons/tabler/TbStar';
import Link from '../../core/Link';

const activityIcons: Record<TActivityType, ReactNode> = {
  commented: <TbMessagesCircle2 />,
  published: <TbPencil />,
  rated: <TbStar />
};

interface IActivityListProps {}

/**
 * Component for displaying a list of activities.
 */
const ActivityList: FC<IActivityListProps> = () => {
  //TODO: This would be fetched from the API
  const activities: TActivitySection[] = [
    {
      timestamp: '2023-07-15',
      activities: [
        {
          id: '1',
          title: {
            name: 'Unlocking the Power of Quantum Computing',
            href: '#'
          },
          timestamp: '2023-07-15',
          type: 'published'
        },
        {
          id: '2',
          title: {
            name: 'Unlocking the Power of Quantum Computing',
            href: '#'
          },
          timestamp: '2023-07-15',
          type: 'commented'
        },
        {
          id: '4',
          title: {
            name: 'Learn Quantum Computing with Python and Qiskit',
            href: '#'
          },
          timestamp: '2023-07-10',
          type: 'published'
        }
      ]
    },
    {
      timestamp: '2023-06-03',
      activities: [
        {
          id: '3',
          title: {
            name: 'How to PhotonQ',
            href: '/docs'
          },
          timestamp: '2023-06-01',
          type: 'rated'
        }
      ]
    }
  ];

  const stepperData: TStepperSection[] = activities.map(section => {
    const sectionDate = new Date(section.timestamp);
    const sectionTitle = (
      <HStack spacing={1}>
        <Text>{sectionDate.toLocaleString('default', { month: 'long' })}</Text>
        <Text opacity={0.5}>{sectionDate.getFullYear()}</Text>
      </HStack>
    );
    let lastDay = -1; // Used to cache the latest activity's day of the month
    return {
      title: sectionTitle,
      titleProps: {
        fontSize: 'xs',
        fontWeight: 'bold'
      },
      items: section.activities.map(({ title, type, timestamp }) => {
        const itemDate = new Date(timestamp);
        // Only show the date if it differs from the previous activity
        const showDate = lastDay !== itemDate.getDate();
        lastDay = itemDate.getDate();
        const activityTitle = (
          <LinkBox
            as={HStack}
            _hover={{
              'p, a': {
                color: 'components.userActivity.item.title._hover.color'
              }
            }}
          >
            <LinkOverlay as={Link} href={title.href}>
              {title.name}
            </LinkOverlay>
            {showDate && (
              <>
                <Spacer />
                <Text fontSize="xs" color="gray.500">
                  {`${itemDate.toLocaleString('default', {
                    month: 'short'
                  })} ${itemDate.toLocaleDateString('default', {
                    day: '2-digit'
                  })}`}
                </Text>
              </>
            )}
          </LinkBox>
        );

        return {
          title: activityTitle,
          icon: activityIcons[type]
          // children: activity.timestamp
        };
      })
    };
  });

  return (
    <Box textAlign="left" w="full">
      <Heading size="md" mb={5}>
        Activity
      </Heading>
      <Stepper sections={stepperData} />
    </Box>
  );
};

export default ActivityList;
