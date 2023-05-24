import { IHeadingProps } from "../../components/main-content/Heading";
import { ICodeSnippetProps } from "../../components/main-content/code-snippet/CodeSnippet";
import { IFileSystemProps } from "../../components/main-content/filesystem/Filesystem";

export enum MainContentType {
    Heading,
    CodeSnippet,
    Filesystem,
}

export interface IMainContentComponent {
    type: MainContentType;
}

export interface IHeadingComponent extends IMainContentComponent, IHeadingProps {
    type: MainContentType.Heading;
}

export interface IFilesystemComponent extends IMainContentComponent, IFileSystemProps {
    type: MainContentType.Filesystem;
}

export interface ICodeSnippetComponent extends IMainContentComponent, ICodeSnippetProps {
    type: MainContentType.CodeSnippet;
}

export type MainContentItem = IHeadingComponent | IFilesystemComponent | ICodeSnippetComponent;