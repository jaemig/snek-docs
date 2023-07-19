import { ReactNode } from "react";
import { Optional } from "../utilityTypes";
import { CardProps } from "@chakra-ui/react";

/**
 * A single post
 */
export type TPost = {
    id: string;
    publicationDate: string;
    author: string;
    title: string;
    previewImage?: string;
    content: ReactNode[];
    summary: string;
    likes: number;
    hasLiked: boolean;
    url: string;
    canManage: boolean;
}

/**
 * A single preview of a post
 */
export type TPostPreview = Omit<Optional<TPost, "hasLiked" | "canManage">, "content">;

/**
 * Props for a single post preview components (for all variants)
 */
export interface IPostPreviewProps<T> extends TPostPreview {
    toggleLike: (id: TPostPreview['id']) => void;
    canManage?: boolean;
    wrapperProps?: T;
}