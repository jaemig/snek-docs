import { Box, BoxProps, Tooltip, TooltipProps } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { TFilesystemItem } from "./filesystem.types";
import BsFileEarmark from "../../icons/bootstrap/BsFileEarmark";
import BsFolder2Open from "../../icons/bootstrap/BsFolder2Open";
import BsFolder from "../../icons/bootstrap/BsFolder";

interface FilesystemItemProps {
    item: TFilesystemItem;
    intendation: number;
    isChild?: boolean;
}
/**
 * A single item in the filesystem
 */
const FilesystemItem: FC<FilesystemItemProps> = ({ item, intendation, isChild }) => {
    const isFolder = item.type === 'folder';

    const [showChildren, setShowChildren] = useState(isFolder && (item.defaultOpen ?? true));
    const toggleShowChildren = () => setShowChildren(!showChildren);
    
    const tooltipText = typeof item.tooltip === 'string' ? item.tooltip : item.tooltip?.text;
    let tooltipProps: TooltipProps = {
        label: tooltipText,
        bgColor: 'components.filesystem.tooltip.bgColor',
        color: 'components.filesystem.tooltip.color',
        borderRadius: 'md',
        placement: 'right',
        children: undefined,
    };
    if (typeof item.tooltip === 'object') {
        tooltipProps = {
            ...tooltipProps,
            ...item.tooltip,
        }
    }

    let IconComp;
    let props: BoxProps = { };
    if (isFolder) {
        props = {
            ...props,
            cursor: 'pointer',
            _hover: { ...props._hover, opacity: 0.7 },
            transition: 'opacity 0.2s ease-in-out',
        };
        IconComp = showChildren ? BsFolder2Open : BsFolder;
    } else {
        props.cursor = tooltipText ? 'pointer' : 'default';
        IconComp = BsFileEarmark;
    }

    if (isChild) {
        props = {
            ...props,
            position: 'relative',
            _before: {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: intendation * -3,
                transform: 'translateY(-50%)',
                height: '1px',
                width: 2,
                bg: 'components.filesystem.',
            }
        };
    }

    const itemContent = (
        <Box w='fit-content'>
            <IconComp
                boxSize='14px'
                mr={2}
                fill='components.filesystem.icon.color'
                color='components.filesystem.icon.color'
            />
            {item.name}
        </Box>
    );

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
                {
                    tooltipText && tooltipText.length
                    ? (
                        <Tooltip 
                            {...tooltipProps}
                            label={tooltipText}
                            borderRadius='md'
                            openDelay={500}
                        >
                            {itemContent}
                        </Tooltip>
                    )
                    : itemContent
                }
            </Box>
            {
                item.type === 'folder' && showChildren && (
                    <Box
                        borderLeft='1px solid'
                        borderColor='leftNav.accordion.panel.borderLeftColor'
                    >
                        {
                            item.children?.map((child, i) => <FilesystemItem item={child} intendation={intendation + 1} key={i} isChild />)
                        }
                    </Box>
                )
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
            px={5}
            py={3}
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