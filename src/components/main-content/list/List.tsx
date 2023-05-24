import { List as ChList, UnorderedList, OrderedList, ListItem } from "@chakra-ui/react";
import { ComponentType, FC } from "react";
import { IMainContentComponentBaseProps } from "../../../layout/main/mainContent.types";

export type ListItem = {
    text: string;
    children?: ListItem[];
}

export interface IListProps extends IMainContentComponentBaseProps {
    variant: 'unordered' | 'ordered';
    items: ListItem[];
}

/**
 * Component for displaying lists.
 */
const List: FC<IListProps> = ({ baseProps, variant, items }) => {
    let ListComp: typeof UnorderedList | typeof OrderedList = UnorderedList;
    if (variant === 'ordered') ListComp = OrderedList;

    return (
        <ListComp {...baseProps}>
            {items.map((item, index) => (
                <ChList key={index}>
                    <ListItem>{item.text}</ListItem>
                    {item.children && <List variant={variant} items={item.children} {...baseProps} />}
                </ChList>
            ))}
        </ListComp>
    )
}

export default List;