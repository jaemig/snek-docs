import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Flex, Link, Spacer, Text} from '@chakra-ui/react'
import React, {FC} from 'react'
import {LinkData} from '../../types/navigation'

interface MainBottomNavProps {
  previousPage?: LinkData
  nextPage?: LinkData
}

const props = {
  display: 'flex',
  alignItems: 'center',
  opacity: 0.7,
  _hover: {
    color: 'main.bottomNav.linkHoverColor',
    opacity: 1
  }
}

/**
 * Main bottom navigation component.
 * This shows links to the respective previous and next page.
 */
const MainBottomNav: FC<MainBottomNavProps> = ({previousPage, nextPage}) => {
  return (
    <Flex
      borderTop="1px solid"
      borderColor="components.separator.borderColor"
      mt={10}
      pt={5}
      pb="8px" // This is to make the nav controls align with the bottom of this nav
    >
      {previousPage && (
        <Link href={previousPage.href} {...props}>
          <ChevronLeftIcon mr={2} />
          <Text as="span" verticalAlign="middle">
            {previousPage.name}
          </Text>
        </Link>
      )}
      <Spacer minW={10} />
      {nextPage && (
        <Link href={nextPage.href} {...props} textAlign="right">
          <Text as="span" verticalAlign="middle">
            {nextPage.name}
          </Text>
          <ChevronRightIcon ml={2} />
        </Link>
      )}
    </Flex>
  )
}

export default MainBottomNav
