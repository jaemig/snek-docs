import { Box, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import BaseContentLayout from '../layout/BaseContentLayout';

/**
 * Content for the contact page.
 */
const ContactContent: FC = () => {
  return (
    <BaseContentLayout>
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '4xl' }}
        textAlign={'center'}
        mb={5}
      >
        Imprint
      </Heading>

      <Box my={5}>
        <Heading as="h2" fontSize="xl" mb={2}>
          Company Details
        </Heading>
        <Text>Company Name: [Your Company Name]</Text>
        <Text>Address: [Your Company Address]</Text>
        <Text>Phone: [Your Phone Number]</Text>
        <Text>Email: [Your Email Address]</Text>
      </Box>

      <Box my={5}>
        <Heading as="h2" fontSize="xl" mb={2}>
          Registration Details
        </Heading>
        <Text>Registration Number: [Your Registration Number]</Text>
        <Text>Registration Location: [Your Registration Location]</Text>
      </Box>

      <Box my={5}>
        <Heading as="h2" fontSize="xl" mb={2}>
          VAT ID
        </Heading>
        <Text>VAT ID: [Your VAT ID]</Text>
      </Box>

      <Box my={5}>
        <Heading as="h2" fontSize="xl" mb={2}>
          Responsible for Content
        </Heading>
        <Text>Name: [Name of Person Responsible for Content]</Text>
      </Box>

      <Box my={5}>
        <Heading as="h2" fontSize="xl" mb={2}>
          Data Protection Officer
        </Heading>
        <Text>Name: [Data Protection Officer's Name]</Text>
        <Text>Contact: [Data Protection Officer's Contact Information]</Text>
      </Box>
    </BaseContentLayout>
  );
};

export default ContactContent;
1;
