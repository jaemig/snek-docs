import {
  Box,
  BoxProps,
  Button,
  Center,
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
import usePagination from '../../../hooks/use-pagination';

const activityIcons: Record<TActivityType, ReactNode> = {
  commented: <TbMessagesCircle2 />,
  published: <TbPencil />,
  rated: <TbStar />
};

interface IActivityListProps extends BoxProps {}

/**
 * Component for displaying a list of activities.
 */
const ActivityList: FC<IActivityListProps> = ({ ...props }) => {
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
      timestamp: '2023-06-22',
      activities: [
        {
          id: '3',
          title: {
            name: 'How to PhotonQ',
            href: '/docs'
          },
          timestamp: '2023-06-01',
          type: 'rated'
        },
        {
          id: '5',
          title: {
            name: 'Exploring Quantum Algorithms',
            href: '#'
          },
          timestamp: '2023-07-12',
          type: 'published'
        },
        {
          id: '6',
          title: {
            name: 'Introduction to Quantum Mechanics',
            href: '#'
          },
          timestamp: '2023-07-17',
          type: 'published'
        },
        {
          id: '7',
          title: {
            name: 'Introduction to Quantum Mechanics',
            href: '#'
          },
          timestamp: '2023-07-17',
          type: 'commented'
        }
      ]
    },
    {
      timestamp: '2023-05-30',
      activities: [
        {
          id: '8',
          title: {
            name: "Quantum Computing: A Beginner's Guide",
            href: '#'
          },
          timestamp: '2023-07-09',
          type: 'published'
        },
        {
          id: '9',
          title: {
            name: 'Quantum Computing Hardware Overview',
            href: '#'
          },
          timestamp: '2023-07-16',
          type: 'published'
        },
        {
          id: '10',
          title: {
            name: 'Quantum Cryptography: Ensuring Secure Communication',
            href: '#'
          },
          timestamp: '2023-07-15',
          type: 'published'
        }
      ]
    },
    {
      timestamp: '2023-04-20',
      activities: [
        {
          id: '11',
          title: {
            name: 'Quantum Machine Learning: Enhancing AI with Qubits',
            href: '#'
          },
          timestamp: '2023-07-14',
          type: 'published'
        },
        {
          id: '12',
          title: {
            name: 'Quantum Error Correction: Protecting Qubits',
            href: '#'
          },
          timestamp: '2023-07-13',
          type: 'published'
        },
        {
          id: '13',
          title: {
            name: 'Quantum Supremacy: Breaking Computational Barriers',
            href: '#'
          },
          timestamp: '2023-07-12',
          type: 'published'
        },
        {
          id: '14',
          title: {
            name: 'Quantum Entanglement: Spooky Action at a Distance',
            href: '#'
          },
          timestamp: '2023-07-11',
          type: 'published'
        },
        {
          id: '15',
          title: {
            name: 'Quantum Algorithms for Optimization Problems',
            href: '#'
          },
          timestamp: '2023-07-10',
          type: 'published'
        }
      ]
    }
  ];

  const pagination = usePagination({
    itemsPerPage: 3,
    totalItems: activities.length
  });
  // const sectionOffset = 0;

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
                <Text
                  display={{ base: 'none', md: 'initial' }}
                  fontSize="xs"
                  color="components.userActivity.item.title.date.color"
                >
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
        };
      })
    };
  });

  return (
    <Box textAlign="left" w="full" {...props}>
      <Heading size="md" mb={5}>
        Activity
      </Heading>
      <Stepper
        sections={stepperData.slice(
          0,
          pagination.currentPage * pagination.itemsPerPage
        )}
      />
      <Center mt={5}>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          display={
            pagination.currentPage === pagination.totalPages ? 'none' : ''
          }
          onClick={pagination.nextPage}
        >
          Show more
        </Button>
      </Center>
    </Box>
  );
};

export default ActivityList;
