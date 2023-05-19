import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { TFilesystemItem } from "./filesystem.types";
import FaRegFolderOpen from "../../icons/FaRegFolderOpen";
import FaRegFolder from "../../icons/FaRegFolder";
import FaRegFileAlt from "../../icons/FaRegFileAlt";

const FilesystemItem: FC<{ item: TFilesystemItem, intendation: number }> = ({ item, intendation }) => {

    const isFolder = item.type === 'folder';

    const [showChildren, setShowChildren] = useState(isFolder && (item.defaultOpen ?? true));

    let IconComp;
    let props: BoxProps = { };
    if (isFolder) {
        props = {
            ...props,
            cursor: 'pointer',
            _hover: { ...props._hover, opacity: 0.7 },
            transition: 'opacity 0.2s ease-in-out',
        };
        IconComp = showChildren ? FaRegFolderOpen : FaRegFolder;
    } else {
        props.cursor = 'default';
        IconComp = FaRegFileAlt;
    }

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
                key={0}
                mb={1}
                color={item.isSelected ? 'components.filesystem.selected.color' : 'components.filesystem.color'}
            >
                <IconComp
                    boxSize='14px'
                    mr={2}
                    fill='components.filesystem.icon.color'
                    color='components.filesystem.icon.color'
                />
                {item.name}
            </Box>
            {
                item.type === 'folder' && showChildren && item.children?.map((child, i) => <FilesystemItem item={child} intendation={intendation + 1} key={i} />)
            }
        </Box>
    )
}

interface FileSystemProps {
    structure: TFilesystemItem[];
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
                structure.map((item, i) => <FilesystemItem item={item} intendation={0} key={i} />)
            }
        </Box>
    )
};

export default Filesystem;