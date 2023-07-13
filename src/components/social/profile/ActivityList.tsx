import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { TActivitySection } from '../../../types/features/activity';
import { TStepperSection } from '../../../types/core/stepper';
import Stepper from '../../core/stepper/Stepper';

interface IActivityListProps {}

/**
 * Component for displaying a list of activities.
 */
const ActivityList: FC<IActivityListProps> = () => {
  //TODO: This would be fetched from the API
  const activities: TActivitySection[] = [
    {
      title: 'July 2023',
      activities: [
        {
          id: '1',
          title: 'Unlocking the Power of Quantum Computing',
          timestamp: '2023-07-15',
          type: 'published'
        },
        {
          id: '2',
          title: 'Unlocking the Power of Quantum Computing',
          timestamp: '2023-07-13',
          type: 'commented'
        }
      ]
    },
    {
      title: 'June 2023',
      activities: [
        {
          id: '3',
          title: 'How to PhotonQ',
          timestamp: '2023-06-01',
          type: 'rated'
        }
      ]
    }
  ];

  const stepperData: TStepperSection[] = activities.map(section => {
    return {
      title: section.title,
      items: section.activities.map(activity => {
        return {
          title: activity.title,
          icon: <></>,
          children: activity.timestamp
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
