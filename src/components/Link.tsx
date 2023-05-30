import { Link as ChLink, LinkOverlayProps, LinkProps } from "@chakra-ui/react";
import { Link as GaLink } from "gatsby";
import { FC } from "react";
import { isInternalLink } from "../helpers/utils";

interface GatsbyLinkProps extends LinkOverlayProps {
    href?: string;
    label?: string;
}

/**
 * Custom link component combining Chakra UI's and Gatsby's Link.
 */
const Link: FC<GatsbyLinkProps> = ({ href = '#', label, ...props }) => {

    // Props that both link variants share.
    const baseProps: LinkProps = {
        position: 'relative',
    }

    if (isInternalLink(href)) {
        return <ChLink {...baseProps} as={GaLink} {...props}>{ label }</ChLink>
    }
    return <ChLink {...baseProps} href={href} {...props}>{ label }</ChLink>
}

export default Link;