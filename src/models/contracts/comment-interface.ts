import {AuthorInterface} from "./author-interface";
import {IdentifierInterface} from "./identifier-interface";
import {ResourceIdentifierInterface} from "./resource-identifier-interface";

export interface CommentParentInterface extends AuthorInterface, IdentifierInterface, ResourceIdentifierInterface {
    getComments(): CommentInterface[];
}

export interface CommentInterface extends AuthorInterface, ResourceIdentifierInterface {
    getBody(): string;
}

