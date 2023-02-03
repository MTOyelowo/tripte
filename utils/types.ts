export interface PostDetail {
    id: string
    title: string
    slug: string
    meta: string
    category: string
    tags: string[]
    thumbnail?: string
    createdAt: string
}

export interface IncomingPost {
    title: string;
    content: string;
    slug: string;
    meta: string;
    tags: string;
    category: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar: string | undefined;
    role: "user" | "admin";
}

export type replyComments = CommentResponse[];
export interface CommentResponse {
    id: string;
    content: string;
    createdAt: string;
    likes: number;
    likedByOwner?: boolean;
    replies?: replyComments;
    repliedTo?: string;
    chiefComment?: boolean;
    owner: { name: string; id: string; avatar?: string };
}