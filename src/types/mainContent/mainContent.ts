import { ChakraProps } from '@chakra-ui/react';
import { ICodeSnippetProps } from '../../features/main-content/code-snippet/CodeSnippet';
import { IFileSystemProps } from '../../features/main-content/filesystem/Filesystem';
import { IHeadingProps } from '../../features/main-content/heading/Heading';
import { IListProps } from '../../features/main-content/list/List';
import { ITextProps } from '../../features/main-content/text/Text';

export enum MainContentType {
  Heading,
  Text,
  List,
  CodeSnippet,
  Filesystem
}

export interface IMainContentComponentBaseProps {
  baseProps?: ChakraProps;
}

export interface IMainContentComponent {
  type: MainContentType;
}

export interface IHeadingComponent
  extends IMainContentComponent,
  IHeadingProps {
  type: MainContentType.Heading;
}

export interface ITextComponent extends IMainContentComponent, ITextProps {
  type: MainContentType.Text;
}

export interface IListComponent extends IMainContentComponent, IListProps {
  type: MainContentType.List;
}

export interface IFilesystemComponent
  extends IMainContentComponent,
  IFileSystemProps {
  type: MainContentType.Filesystem;
}

export interface ICodeSnippetComponent
  extends IMainContentComponent,
  ICodeSnippetProps {
  type: MainContentType.CodeSnippet;
}

export type MainContentItem =
  | IHeadingComponent
  | ITextComponent
  | IListComponent
  | IFilesystemComponent
  | ICodeSnippetComponent;
