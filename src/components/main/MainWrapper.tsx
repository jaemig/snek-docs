import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
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
    }
];

/**
 * Main wrapper component.
 */
const MainWrapper: FC = () => {
    return (
        <main>
            <Breadcrumb 
                separator={<ChevronRightIcon />}
                fontSize='sm'
            >
                {breadCrumbParts.map((item, i) => {
                    return (
                        <BreadcrumbItem key={i}>
                            <BreadcrumbLink 
                                href={item.href}
                                opacity={0.7}
                                _hover={{
                                    opacity: 1,
                                    textDecoration: 'none',
                                }}
                                transition='opacity 0.1s ease-in-out'
                            >
                                {item.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumb>
        </main>
    )
}

export default MainWrapper;