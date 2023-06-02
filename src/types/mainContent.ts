import {ChakraProps} from '@chakra-ui/react';
import {ICodeSnippetProps} from '../components/main-content/code-snippet/CodeSnippet';
import {IFileSystemProps} from '../components/main-content/filesystem/Filesystem';
import {IHeadingProps} from '../components/main-content/heading/Heading';
import {IListProps} from '../components/main-content/list/List';
import {ITextProps} from '../components/main-content/text/Text';

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
