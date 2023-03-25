import {AuthorInterface} from "./author-interface";
import {IdentifierInterface} from "./identifier-interface";

export interface CommentParentInterface extends AuthorInterface, IdentifierInterface {
    getComments(): CommentInterface[];
}
export interface CommentInterface extends AuthorInterface {
    getBody(): string;
}

