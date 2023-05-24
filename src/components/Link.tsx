import { Link as ChLink, LinkOverlay, LinkOverlayProps, LinkProps } from "@chakra-ui/react";
import { Link as GaLink } from "gatsby";
import { FC } from "react";

interface GatsbyLinkProps extends LinkOverlayProps {
    children: React.ReactNode;
}

/**
 * Custom link component combining Chakra UI's and Gatsby's Link.
 */
const Link: FC<GatsbyLinkProps> = ({ children, ...props }) => {
    return (
        <LinkOverlay as={GaLink} {...props}>{ children }</LinkOverlay>
    )
}

export default Link;