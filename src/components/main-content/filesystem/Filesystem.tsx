import { Box, BoxProps, List, ListItem } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { FileSystemItem } from "./filesystem.types";
import FeatherFolder from "../../icons/FeatherFolder";
import FeatherFile from "../../icons/FeatherFile";

const FilesystemItem: FC<{ item: FileSystemItem, intendation: number }> = ({ item, intendation }) => {

    const [showChildren, setShowChildren] = useState(true);

    let props: BoxProps = { };
    if (item.type === 'folder') {
        props = {
            ...props,
            cursor: 'pointer',
            _hover: { ...props._hover, opacity: 0.7 },
            transition: 'opacity 0.2s ease-in-out',
        }
    } else props.cursor = 'default';

    const IconComp = item.type === 'folder' ? FeatherFolder : FeatherFile;

    const toggleShowChildren = () => {
        setShowChildren(!showChildren);
    }

    return (
        <Box
            ml={intendation * 3}
            mb={1}
        >
            <Box
                {...props}
                onClick={toggleShowChildren}
            >
                <IconComp
                    boxSize='10px'
                    mr={2}
                    fill='none'
                    color='components.filesystem.icon.color'
                />
                {item.name}
            </Box>
            {
                item.type === 'folder' && showChildren && item.children?.map(child => <FilesystemItem item={child} intendation={intendation + 1} />)
            }
        </Box>
    )
}

interface FileSystemProps {
    structure: FileSystemItem[];
}
/**
 * Filesystem component for displaying filesystem structures.
 */
const Filesystem: FC<FileSystemProps> = ({ structure }) => {
    return (
        <Box
            w='fit-content'
            mt={5}
            p={3}
            pb={2}
            border="1px solid"
            borderColor='components.filesystem.borderColor'
            borderRadius="md"
            color='shared.text.default'
            fontSize='sm'
            _hover={{
                boxShadow: 'base',
            }}
            transition='box-shadow 0.2s ease-in-out'
        >
            {
                structure.map(item => <FilesystemItem item={item} intendation={0} />)
            }
        </Box>
    )
};

export default Filesystem;