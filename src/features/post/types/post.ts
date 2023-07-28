import { ReactNode } from 'react';
import { Optional } from '../../../shared/types/utilityTypes';
import { CardProps } from '@chakra-ui/react';

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
};

/**
 * A single preview of a post
 */
export type TPostPreview = Omit<
  Optional<TPost, 'hasLiked' | 'canManage'>,
  'content'
>;

/**TSearchMetaData
 * Metadata for fetching posts
 */
export type TPostListData = {
  posts: TPostPreview[];
  state: 'inactive' | 'loading' | 'error' | 'success';
};

/**
 * Props for a single post preview components (for all variants)
 */
export interface IPostPreviewProps<T> extends TPostPreview {
  toggleLike: (id: TPostPreview['id']) => void;
  canManage?: boolean;
  wrapperProps?: T;
  hideAuthor?: boolean;
}

//TODO: Create a user type
export type TPostReview = {
  id: string;
  post: TPost;
  title: string;
  author: TUser;
}