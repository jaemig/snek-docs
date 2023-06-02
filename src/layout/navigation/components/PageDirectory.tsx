import {ArrowForwardIcon} from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionButtonProps,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  CenterProps,
  LinkProps
} from '@chakra-ui/react'
import {IJaenPage, useJaenPageTree} from '@snek-at/jaen'
import {FC, Fragment, MouseEvent, useMemo} from 'react'
import Link from '../../../components/Link'
import {NavMenuItem, NavMenuSection} from '../../../types/navigation'

// Example menu structure - this would be fetched from a CMS
const menuStructure: NavMenuSection[] = [
  {
    items: [
      {
        name: 'Introduction',
        href: '#',
        children: []
      },
      {
        name: 'Guide',
        href: '#',
        isActive: true,
        children: [
          {
            name: 'Organize Files',
            href: '#'
          },
          {
            name: 'Markdown',
            href: '#'
          },
          {
            name: 'Advanced',
            href: '#',
            children: [
              {
                name: 'Rendering Tables',
                href: '#',
                children: [
                  {
                    name: 'Features',
                    href: '#',
                    isSection: true
                  },
                  {
                    name: 'Syntax Support',
                    href: '#',
                    isSection: true
                  },
                  {
                    name: 'Configuration',
                    href: '#',
                    isSection: true
                  }
                ]
              },
              {
                name: 'Remote Content',
                href: '#'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Themes',
    items: [
      {
        name: 'Docs Theme',
        href: '#'
      },
      {
        name: 'Blog Theme',
        href: '#'
      },
      {
        name: 'Custom Theme',
        href: '#'
      }
    ]
  }
]

const baseMenuItems: NavMenuSection[] = [
  {
    name: 'More',
    items: [
      {
        name: 'About Snek',
        href: '/docs/about-snek'
      },
      {
        name: 'Snek CLI',
        href: 'https://snek.at',
        isExternal: true
      }
    ]
  }
]

const baseMenuItemProps = {
  transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out'
}

const inactiveMenuItemProps = {
  ...baseMenuItemProps,
  opacity: 0.8
}

const activeMenuItemProps = {
  ...baseMenuItemProps,
  opacity: 1,
  bgColor: 'theme.100',
  color: 'leftNav.accordion.activeItem.button.text.color',
  fontWeight: 'bold'
}

/**
 * Handles clicks on links in the main navigation menu. If the target is not an anchor element, the default action is prevented, which prevents the page from reloading.
 * @param ev  The click event that triggered the handler
 */
const linkClickHandler = (ev: MouseEvent<HTMLAnchorElement>) => {
  if (
    ev.target instanceof HTMLAnchorElement ||
    ev.target instanceof HTMLButtonElement ||
    ev.target instanceof HTMLSpanElement
  )
    return
  ev.preventDefault()
}

/**
 * Generates a menu item for the main navigation menu.
 * @param item  The menu item to generate
 * @param isMobile  Whether or not the menu is being generated for mobile. If true, sections will be included.
 * @param closeMobileDrawer  A function to close the mobile drawer. Only required if isMobile is true.
 * @returns
 */
const generateMenuItem = (
  item: NavMenuItem,
  isMobile: boolean,
  closeMobileDrawer?: () => void
) => {
  if (!isMobile && item.isSection) return

  const externalLinkIcon = (
    <ArrowForwardIcon transform={`rotate(-45deg)`} ml={2} />
  )

  const styleProps: CenterProps & AccordionButtonProps & LinkProps = {
    _hover: {opacity: 1}
  }
  if (item.isActive)
    styleProps.backgroundColor = 'leftNav.accordion.activeItem.bgColor'
  else if (styleProps._hover)
    styleProps._hover.backgroundColor =
      'leftNav.accordion.inactiveItem.hoverBgColor'

  // Check if the item has children and is not a section (except on mobile)
  const hasChildren =
    item.children &&
    item.children.length > 0 &&
    (isMobile || item.children.some(child => !child.isSection))

  if (hasChildren) {
    const children = item.children?.map(child =>
      generateMenuItem(child, isMobile, closeMobileDrawer)
    )
    const semanticPath = `leftNav.accordion.${
      item.isActive ? '' : 'in'
    }activeItem.`
    return (
      <AccordionItem
        key={item.href + item.name}
        css={{
          // Remove padding from last accordion item
          '& .chakra-accordion__panel': {
            paddingBottom: 0
          }
        }}
        // This is a hack to remove the bottom border from the last accordion item
        borderBottomWidth="0 !important"
      >
        {({isExpanded}) => (
          <>
            <Link href={item.href} onClick={linkClickHandler}>
              <AccordionButton
                {...(item.isActive
                  ? activeMenuItemProps
                  : inactiveMenuItemProps)}
                {...styleProps}
                // isExternal={item.isExternal}
                borderRadius="md"
                py={1.5}
                backgroundColor={
                  item.isActive ? semanticPath + 'bgColor' : undefined
                }
              >
                <Box as="span" flex="1">
                  {item.name}
                  {item.isExternal && externalLinkIcon}
                </Box>
                <Center
                  {...styleProps}
                  as="span"
                  borderRadius="sm"
                  transition="background-color 0.2s ease-in-out"
                  backgroundColor="transparent"
                  _hover={{
                    bgColor: semanticPath + 'button.icon.hoverContainerBgColor'
                  }}
                >
                  <AccordionIcon
                    className="prv-link"
                    opacity="inherit"
                    transform={`rotate(${isExpanded ? 0 : -90}deg)`}
                  />
                </Center>
              </AccordionButton>
            </Link>
            <AccordionPanel position="relative">
              <Box
                _before={{
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 2,
                  borderRadius: 'full',
                  left: '10px',
                  width: '1px',
                  height: 'calc(100% - 0.5rem)',
                  backgroundColor: 'leftNav.accordion.panel.borderLeftColor'
                }}
              >
                {children}
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    )
  }
  return (
    <Link
      {...(item.isActive ? activeMenuItemProps : inactiveMenuItemProps)}
      {...styleProps}
      key={item.href + item.name}
      href={item.href}
      isExternal={item.isExternal}
      display="block"
      py={1.5}
      px={4}
      mt={1}
      cursor="pointer"
      borderRadius="md"
      onClick={closeMobileDrawer}
    >
      {item.isSection && (
        <Box key={-5} as="span" mr={2} fontSize="sm" color="gray.400">
          #
        </Box>
      )}
      {item.name}
      {item.isExternal && externalLinkIcon}
    </Link>
  )
}

/**
 * Converts a page tree to a usable menu data structure.
 * @param pageTree  The page tree to convert
 * @returns  The converted menu data structure and an array of indices of expanded items
 */
const convertPageTreeToMenu = (pageTree: IJaenPage[]) => {
  let expandedItemIdx = 0 // The next index of an possibly expanded item
  const result: {menu: NavMenuSection[]; expandedIdx: number[]} = {
    menu: [],
    expandedIdx: []
  }
  const pageMap: {[key: string]: IJaenPage} = {}
  pageTree.forEach(page => (pageMap[page.id] = page))

  const docs_page = pageTree.find(page => page.slug === 'docs')
  if (!docs_page) return result
  const currentPath = window.location.pathname

  // Recursively build a menu item from a page
  const buildMenuItem = (
    page_id: string,
    buildPath: string
  ): NavMenuItem | undefined => {
    const page = pageMap[page_id]
    if (!page) return undefined

    const href = page.buildPath ?? buildPath + page.slug + '/'
    const children = page.children
      .map(({id}) => buildMenuItem(id, href))
      .filter((item): item is NavMenuItem => !!item)

    // Check if any item in the current page or its children is active
    // If so, add the index of the current item to the expanded item index array
    // This is used to expand the correct items in the accordion when the page is loaded
    const hasActiveChild = children.some(
      child => child.isActive || child.hasActiveChild
    )
    if (children.length > 0) {
      if (hasActiveChild) result.expandedIdx.push(expandedItemIdx)
      expandedItemIdx++
    }

    return {
      href: currentPath === href ? '' : href,
      name: page.jaenPageMetadata.title ?? page.slug,
      children: children,
      isActive: currentPath === href,
      hasActiveChild: hasActiveChild
    }
  }

  const menuData: NavMenuSection[] = [
    {
      items: docs_page.children
        .map(({id}) => buildMenuItem(id, docs_page.buildPath ?? '/'))
        .filter((item): item is NavMenuItem => !!item)
    }
  ]

  expandedItemIdx-- // Decrement the expanded item index to get correct the index

  return {
    menu: menuData,
    // Since the menu is built from the inside out, the first item is the last expanded item
    expandedIdx: result.expandedIdx.map(idx => expandedItemIdx - idx)
  }
}

interface PageDirectoryProps {
  isExpanded?: boolean
  isMobile?: boolean
  closeMobileDrawer?: () => void
}
/**
 * The page directory component that shows the documentation structure.
 */
const PageDirectory: FC<PageDirectoryProps> = ({
  isExpanded = true,
  isMobile = false,
  closeMobileDrawer
}) => {
  const pageTree = useJaenPageTree()

  const menuStructure = useMemo(
    () => convertPageTreeToMenu(pageTree),
    [pageTree]
  )
  return (
    <Accordion
      visibility={isExpanded ? 'visible' : 'hidden'}
      opacity={isExpanded ? 1 : 0}
      w={isExpanded ? '100%' : 'max-content'}
      allowMultiple
      css={{
        // Remove border from last accordion item
        '& .chakra-accordion__item:last-child': {
          borderBottomWidth: 0
        }
      }}
      variant="leftNav"
      transition="opacity 0.2s ease-in-out, width 0.2s ease-in-out"
      mb={isMobile ? 12 : undefined}
      defaultIndex={menuStructure.expandedIdx}
    >
      {[...menuStructure.menu, ...baseMenuItems].map((section, i) => (
        <Fragment key={i}>
          {section.name && (
            <Box
              key={0}
              mt={i === 0 ? 0 : 9}
              fontSize="sm"
              fontWeight="bold"
              ml={4}
            >
              {section.name}
            </Box>
          )}
          <Box key={1}>
            {section.items?.map(item =>
              generateMenuItem(item, isMobile, closeMobileDrawer)
            )}
          </Box>
        </Fragment>
      ))}
    </Accordion>
  )
}

export default PageDirectory
