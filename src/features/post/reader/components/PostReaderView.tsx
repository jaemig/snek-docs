import { FC } from 'react';
import { MainBreadcrumbPart } from '../../../../shared/types/navigation';
import LeftNavPostReader from './LeftNavPostReader';
import { Box, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react';
import Heading from '../../../main-content/heading/components/Heading';
import RightNavPostReader from './RightNavPostReader';
import MainBreadcrumb from '../../../../shared/containers/navigation/components/MainBreadcrumb';
import UserPreview from '../../../user/avatar/components/UserPreview';
import { TUser } from '../../../user/types/user';
import Link from '../../../../shared/components/Link';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';

//* This would be the data that comes from Jaen.
const userData: TUser = {
  displayName: 'Emily Brooks',
  username: 'emilybrooks',
  location: 'San Francisco, CA',
  // company: 'Snek',
  avatarUrl:
    'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024',
  bio: "Adventurous spirit with a knack for words and a passion for knowledge. Exploring the world of academia, one document at a time. Forever curious, forever learning. Let's dive into the realm of information together uncover the wonders of education.",
  socials: [
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

/**
 * Component for reading a post.
 */
const PostReaderView: FC = () => {
  const breadcrumbParts: MainBreadcrumbPart[] = [
    {
      name: '@emilybrooks',
      href: '/profile',
      isUser: true,
      showUserImage: true
    },
    {
      name: 'Posts',
      href: '/profile#posts'
    },
    {
      name: 'Unlocking the Power of Quantum Computing',
      href: '#'
    }
  ];

  return (
    <>
      <LeftNavPostReader />
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <MainBreadcrumb parts={breadcrumbParts} />
          <Heading variant="h1">
            Unlocking the Power of Quantum Computing
            <IconButton
              icon={<TbStar />}
              aria-label="Rate post"
              variant="ghost-hover-opacity"
              _hover={{
                transform: 'scale(1.3)',
                color: 'flat.se.vibrantYellow'
              }}
            />
          </Heading>
          <HStack spacing={1} mb={10}>
            <Text as="span">by</Text>
            <Link href="/profile">
              <UserPreview
                user={userData}
                showTooltip={false}
                showDisplayName
                showAvatar
                avatarProps={{
                  verticalAlign: 'middle',
                  boxSize: '18px'
                }}
                transition="color 0.2s ease-in-out"
                _hover={{
                  color: 'views.postReaderView.userPreview._hover.color'
                }}
              />
            </Link>
          </HStack>
          <VStack spacing={3} alignItems="start">
            <Text>
              Quantum computing is a cutting-edge technology that has the
              potential to revolutionize various fields, from cryptography to
              drug discovery and optimization problems. One approach to quantum
              computing is quantum annealing, which is an optimization process
              that leverages quantum fluctuations to find the global minimum of
              an objective function. Unlike classical computing methods such as
              simulated annealing, quantum annealing starts with a
              quantum-mechanical superposition of all possible states and
              evolves according to the time-dependent Schrödinger equation. This
              allows the system to undergo quantum parallelism and quantum
              tunneling between states, enabling it to efficiently explore
              energy landscapes and find the optimal solution. Quantum annealing
              has shown promising results in solving combinatorial optimization
              problems with many local minima and has both experimental and
              theoretical evidence to support its effectiveness.
            </Text>
            <Heading variant="h2" w="full">
              Quantum Annealing
            </Heading>
            <Text>
              In the field of artificial intelligence (AI), another aspect of
              unlocking the power of quantum computing lies in AI alignment.
              Paul Christiano, an American AI safety researcher, focuses on
              steering AI systems towards human interests. He has worked on deep
              reinforcement learning from human preferences and AI safety via
              debate, which are crucial areas in ensuring that AI systems align
              with human values and goals. Christiano's research emphasizes the
              importance of reinforcement learning with human feedback in
              harnessing the potential of AI for positive impact. By
              incorporating human preferences and perspectives into AI systems,
              we can mitigate risks and ensure that AI technology remains
              aligned with human interests.
            </Text>
            <Heading variant="h2" w="full">
              AI Alignment
            </Heading>
            <Text>
              While quantum computing holds immense promise, it is essential to
              acknowledge the theoretical foundations that underpin it. One such
              theory is the de Broglie-Bohm theory, which posits that the
              velocities of particles are determined by the wavefunction in a
              3N-dimensional configuration space. This theory provides insights
              into the behavior of quantum systems and helps us understand how
              particles move and interact within the framework of quantum
              mechanics. By studying theories like de Broglie-Bohm theory,
              researchers gain a deeper understanding of the principles that
              govern quantum phenomena and can further advance our knowledge in
              the field of quantum computing.
            </Text>
            <Heading variant="h2" w="full">
              Conclusion
            </Heading>
            <Text>
              In conclusion, unlocking the power of quantum computing requires
              exploring various aspects such as quantum annealing for
              optimization problems, AI alignment to ensure ethical and
              beneficial AI systems, and theoretical frameworks like de
              Broglie-Bohm theory for foundational understanding. These
              different elements come together to push the boundaries of what is
              possible in computing and pave the way for transformative
              advancements in science, technology, and society as a whole. As we
              continue to delve deeper into the realm of quantum computing, it
              is important to foster collaboration between researchers, industry
              experts, and policymakers to harness its potential while
              addressing any ethical, societal, and security concerns that may
              arise along the way.
            </Text>
          </VStack>
        </Box>
        <RightNavPostReader />
      </Stack>
    </>
  );
};

export default PostReaderView;
