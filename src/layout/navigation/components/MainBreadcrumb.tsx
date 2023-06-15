import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbLinkProps,
  BreadcrumbItem,
  BreadcrumbLink,
  Text
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { MainBreadcrumbPart } from '../../../types/navigation';
import Link from '../../../components/core/Link';

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
];

interface IMainBradcrumbProps {
  parts: MainBreadcrumbPart[];
}
/**
 *  Main breadcrumb component.
 */
const MainBreadcrumb: FC<IMainBradcrumbProps> = ({ parts }) => {
  return (
    <Breadcrumb separator={<ChevronRightIcon />} fontSize="sm" mb={5}>
      {parts.map((item, i) => {
        const props: BreadcrumbLinkProps = {};

        if (item.isActive) {
          props.opacity = 1;
          props.color = 'main.breadcrumb.active.color';
          props.fontWeight = 'semibold';
        } else {
          // props.opacity = 0.7;
          props.color = 'main.breadcrumb.inactive.color';
          if (!item.isDisabled) {
            props._hover = {
              opacity: 1,
              textDecoration: 'none',
              color: 'main.breadcrumb.inactive.hover.color'
            };
          }
        }

        //TODO: Improve responsiveness of breadcrumb
        return (
          <BreadcrumbItem
            key={i}
            isCurrentPage={item.isActive || item.isDisabled}
            isTruncated
          >
            <BreadcrumbLink
              as={Link}
              href={item.href}
              transition="opacity 0.1s ease-in-out"
              isCurrentPage
              isTruncated
              {...props}
            >
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default MainBreadcrumb;
