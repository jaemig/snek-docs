import { Text as ChText } from "@chakra-ui/react";
import { IMainContentComponentBaseProps } from "../../../layout/main/mainContent.types";
import React, { FC, ReactNode } from "react";

export interface ITextProps extends IMainContentComponentBaseProps {
    children: ReactNode;
}

/**
 * Component for displaying text (in the main content)
 */
const Text: FC<ITextProps> = ({ baseProps, children }) => {
    return (
        <ChText
            {...baseProps}
        >
            { children }
        </ChText>
    );
}

export default Text;