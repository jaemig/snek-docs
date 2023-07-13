import { ReactNode } from "react";
import { Optional } from "../utilityTypes";

/**
 * A single post
 */
export type TPost = {
    id: string;
    publicationDate: string;
    title: string;
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