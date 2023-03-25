type AuthorMapping = {
    login: string;
};

export type CommentMapping = {
    id: string;
    author: AuthorMapping;
    body: string;
}

export type DiscussionMapping = {
    id: string;
    number: number;
    author: AuthorMapping;
    comments: {
        nodes: CommentMapping[]
    }
}

export type DiscussionRepositoryMapping = {
    repository: {
        discussions: {
            nodes: DiscussionMapping[];
        }
    }
}