import { Box, Button, Container, Flex, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import SectionTitle from '../../components/photonq/SectionTitle';
import { Field } from '@snek-at/jaen';

const PhotonQ: FC = () => {
  return (
    <Box as="section" bgColor="pq.shared.section.bgColor" py={20}>
      <Flex maxW="7xl" mx="auto">
        <Box maxW="50%">
          <SectionTitle
            label="PhotonQ"
            labelFieldname="PhotonQLabel"
            title="One-way Quantum Computing"
          />
          <Field.Text
            name="PhotonQText"
            defaultValue="PhotonQ provides cloud-based access to a real photonic one-way computer backend. Our system exploits cutting-edge quantum photonic technology to realize a photonic quantum computing platform. The quantum processing unit can be accessed and programmed through our customized user interface."
            mt={5}
          />
          <Button mt={7} variant="pq-solid">
            <Field.Text
              name="PhotonQButtonText"
              defaultValue="Register Now"
            ></Field.Text>
          </Button>
        </Box>
        <Spacer />
        <Box
          maxH="316px"
          _hover={{
            transform: 'scale(1.05)'
          }}
          transition="transform .2s ease-in-out"
        >
          <Field.Image name="PhotonQRightIamge" objectFit="contain" />
        </Box>
      </Flex>
    </Box>
  );
};

export default PhotonQ;
