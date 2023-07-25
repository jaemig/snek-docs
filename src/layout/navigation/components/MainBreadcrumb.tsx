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
import Link from '../../../shared/components/Link';

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
          props.color = 'main.breadcrumb.active.color';
          props.fontWeight = 'semibold';
        } else {
          // props.opacity = 0.7;
          props.color = 'main.breadcrumb.inactive.color';
          if (!item.isDisabled) {
            props._hover = {
              textDecoration: 'none',
              color: 'main.breadcrumb.inactive.hover.color'
            };
          }
        }

        return (
          <BreadcrumbItem
            key={i}
            isCurrentPage={item.isActive || item.isDisabled}
            isTruncated
          >
            <BreadcrumbLink
              as={Link}
              href={item.href}
              isTruncated
              transition="color 0.2s ease-in-out"
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
