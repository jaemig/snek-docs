import { IHeadingProps } from "../../components/main-content/heading/Heading";
import { ICodeSnippetProps } from "../../components/main-content/code-snippet/CodeSnippet";
import { IFileSystemProps } from "../../components/main-content/filesystem/Filesystem";
import { BoxProps, ChakraProps } from "@chakra-ui/react";

export enum MainContentType {
    Heading,
    Text,
    CodeSnippet,
    Filesystem,
}

export interface IMainContentComponentBaseProps {
    baseProps?: ChakraProps
}

export interface IMainContentComponent {
    type: MainContentType;
}

export interface IHeadingComponent extends IMainContentComponent, IHeadingProps {
    type: MainContentType.Heading;
}

export interface ITextComponent extends IMainContentComponent, BoxProps {
    type: MainContentType.Text;
}

export interface IFilesystemComponent extends IMainContentComponent, IFileSystemProps {
    type: MainContentType.Filesystem;
}

export interface ICodeSnippetComponent extends IMainContentComponent, ICodeSnippetProps {
    type: MainContentType.CodeSnippet;
}

export type MainContentItem = IHeadingComponent | ITextComponent | IFilesystemComponent | ICodeSnippetComponent;