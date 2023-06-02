import {ChevronRightIcon} from '@chakra-ui/icons'
import {
  Breadcrumb,
  BreadcrumbLinkProps,
  BreadcrumbItem,
  BreadcrumbLink,
  Text
} from '@chakra-ui/react'
import React, {FC} from 'react'

// Example breadcrumb parts - this would be fetched from a CMS or other data source
const breadCrumbParts = [
  {
    name: 'Documentation',
    href: '#',
    isDisabled: true
  },
  {
    name: 'Guide',
    href: '#'
  },
  {
    name: 'Quick Start',
    href: '#',
    isActive: true
  }
]

/**
 *  Main breadcrumb component.
 */
const MainBreadcrumb: FC = () => {
  return (
    <Breadcrumb
      separator={<ChevronRightIcon />}
      fontSize="sm"
      w="100%"
      overflowX="auto"
      mb={5}
    >
      {breadCrumbParts.map((item, i) => {
        const props: BreadcrumbLinkProps = {}

        if (item.isActive) {
          props.opacity = 1
          props.color = 'main.breadcrumb.active.color'
          props.fontWeight = 'semibold'
        } else {
          // props.opacity = 0.7;
          props.color = 'main.breadcrumb.inactive.color'
          if (!item.isDisabled) {
            props._hover = {
              opacity: 1,
              textDecoration: 'none',
              color: 'main.breadcrumb.inactive.hover.color'
            }
          }
        }

        //TODO: Improve responsiveness of breadcrumb
        return (
          <BreadcrumbItem
            key={i}
            isCurrentPage={item.isActive || item.isDisabled}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            <BreadcrumbLink
              href={item.href}
              transition="opacity 0.1s ease-in-out"
              isCurrentPage
              {...props}
            >
              <Text isTruncated>{item.name}</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default MainBreadcrumb
