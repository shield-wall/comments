type AuthorMapping = {
    login: string;
};

export type CommentMapping = {
    author: AuthorMapping;
    body: string;
}

export type DiscussionMapping = {
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