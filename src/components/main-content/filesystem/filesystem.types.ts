export type FilesystemItemType = 'file' | 'folder';

export type FileSystemItem = FileSystemFolder | FileSystemFile;

export type FileSystemItemBase = {
    name: string;
    type: FilesystemItemType;
}

export type FileSystemFolder = FileSystemItemBase & {
    type: 'folder';
    children?: Array<FileSystemItem>;
}

export type FileSystemFile = FileSystemItemBase & {
    type: 'file';
}