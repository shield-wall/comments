import {CommentInterface, CommentParentInterface} from "./contracts/comment-interface";
import {CommentMapping, DiscussionMapping} from "../mapping/discussion-repository";

export class Discussion implements CommentParentInterface {

    private readonly id: string;
    private readonly identifier: number| null;
    private readonly author;
    private readonly comments;
    constructor(mapping: DiscussionMapping) {
        this.id = mapping.id;
        this.identifier = mapping.number;
        this.author = mapping.author.login;
        this.comments = mapping.comments.nodes.map((comment) => new DiscussionComment(comment));
    }

    getId(): string {
        return this.id;
    }

    getIdentifier(): number | null {
        return this.identifier;
    }

    getAuthor(): string {
        return this.author;
    }

    getComments(): DiscussionComment[] {
        return this.comments;
    }

}

export class DiscussionComment implements CommentInterface {
    private readonly id: string;
    private readonly author: string;
    private readonly body: string
    constructor(commentMapping: CommentMapping) {
        this.id = commentMapping.id;
        this.author = commentMapping.author.login;
        this.body = commentMapping.body;
    }

    getId(): string {
        return this.id;
    }

    getAuthor(): string {
        return this.author;
    }

    getBody(): string {
        return this.body;
    }
}