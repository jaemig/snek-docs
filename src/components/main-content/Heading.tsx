import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps, Link, ResponsiveValue, ThemeTypings } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import FaHashtag from "../icons/fontawesome/FaHashtag";

// Font sizes for the different heading variants
const variantFontSizes = {
    h1: '36',
    h2: '30',
    h3: '24',
    h4: '20',
    h5: '18',
    h6: '16',
}

const variantLinkFontSizes = {
    h1: '32',
    h2: '26',
    h3: '20',
    h4: '16',
    h5: '14',
    h6: '12',
}

interface HeadingProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    id?: string;
    noAnchor?: boolean;
    customSpacing?: ChakraHeadingProps['mt'];
    noSpacing?: boolean;
    children: ReactNode;
}

/**
 * Component for displaying different heading variants and sizes.
 */
const Heading: FC<HeadingProps> = ({ variant = 'h2', id, noAnchor, customSpacing, noSpacing, children }) => {
    let props: ChakraHeadingProps = { };
    if (variant === 'h2' ) {
        props = {
            ...props,
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            pb: 2,
        }
    }

    return (
        <ChakraHeading
            {...props}
            as={variant}
            id={id}
            fontSize={variantFontSizes[variant]}
            mt={!noSpacing ? (customSpacing ?? 8) : 0}
            _hover={{
                '& a': {
                    opacity: 1,
                },
            }}
        >
            { children }
            {
                !noAnchor && id && (
                    <Link
                        href={`#${id}`}
                        aria-label={`Link to ${children}`}
                        ml={1}
                        opacity={0}
                        fontSize={variantLinkFontSizes[variant]}
                        verticalAlign='top'
                        color='components.heading.link.color.default'
                    >
                        <FaHashtag />
                    </Link>
                )
            }
        </ChakraHeading>
    )
}

export default Heading;