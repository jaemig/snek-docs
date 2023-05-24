import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps, Link, ResponsiveValue, ThemeTypings } from "@chakra-ui/react";
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import FaHashtag from "../../icons/fontawesome/FaHashtag";

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
    h1: '30',
    h2: '24',
    h3: '18',
    h4: '16',
    h5: '14',
    h6: '12',
}

export interface IHeadingProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    id?: string;
    noAnchor?: boolean;
    customSpacing?: ChakraHeadingProps['mt'];
    noSpacing?: boolean;
    activeLink?: boolean;
    setActiveLink?: () => void;
    children: ReactNode;
}

/**
 * Component for displaying different heading variants and sizes.
 */
const Heading: FC<IHeadingProps> = ({ variant = 'h2', id, noAnchor, customSpacing, noSpacing, activeLink, setActiveLink, children }) => {
    let props: ChakraHeadingProps = { };
    if (variant === 'h2' ) {
        props = {
            ...props,
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            pb: 2,
        }
    }

    /**
     * Handles the click event on the heading link.
     * 
     */
    const handleClick = () => {
        if (!activeLink && setActiveLink) setActiveLink();
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
                        lineHeight={(Number(variantLinkFontSizes[variant]) + 5) + 'px'}
                        href={`#${id}`}
                        aria-label={`Link to ${children}`}
                        ml={1}
                        opacity={activeLink ? 1 : 0}
                        fontSize={variantLinkFontSizes[variant]}
                        verticalAlign='top'
                        color='components.heading.link.color.default'
                        onClick={handleClick}
                    >
                        <FaHashtag />
                    </Link>
                )
            }
        </ChakraHeading>
    )
}

export default Heading;