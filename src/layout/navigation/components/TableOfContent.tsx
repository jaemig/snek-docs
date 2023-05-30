import { FC } from "react";
import { useTocNavigation } from "../../../hooks/use-toc-navigation";
import { TableOfContentItem } from "../../../types/navigation";

/**
 * Component for the table of content.
 */
const TableOfContent: FC = ({ }) => {

    const data = useTocNavigation('documentation');

    console.log('table of content', data)

    return (
        <h1>Table of Content</h1>
    );
}

export default TableOfContent;