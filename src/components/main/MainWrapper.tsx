import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbLinkProps } from "@chakra-ui/react";
import React, { FC } from "react";

// Example breadcrumb parts - this would be fetched from a CMS or other data source
const breadCrumbParts = [
    {
        name: 'Documentation',
        href: '#',
    }, 
    {
        name: 'Guide',
        href: '#',
    },
    {
        name: 'Quick Start',
        href: '#',
        isActive: true,
    }
];

/**
 * Main wrapper component.
 */
const MainWrapper: FC = () => {
    return (
        <Box
            as='main'
            px={{ base: 5, md: 0 }}
        >
            <Breadcrumb 
                separator={<ChevronRightIcon />}
                fontSize='sm'
            >
                {breadCrumbParts.map((item, i) => {
                    const props: BreadcrumbLinkProps = {};

                    if (item.isActive) {
                        props.opacity = 1;
                        props.color = 'gray.600';
                        props.fontWeight = 'semibold';
                    } else {
                        props.opacity = 0.7;
                        props.color = 'gray.500';
                        props._hover = {
                            opacity: 1,
                            textDecoration: 'none',
                            color: 'gray.900'
                        };
                    }


                    return (
                        <BreadcrumbItem 
                            key={i}
                            isCurrentPage={item.isActive}
                        >
                            <BreadcrumbLink 
                                href={item.href}
                                transition='opacity 0.1s ease-in-out'
                                isCurrentPage
                                {...props}
                            >
                                {item.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumb>
        </Box>
    )
}

export default MainWrapper;