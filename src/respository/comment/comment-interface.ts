import {Discussion} from "../../models/discussion";

export interface CommentByIdentifierInterface
{
    findByIdentifier(identifier: string): Discussion;
}

export interface CommentAddInterface {
    add(id: string, body: string): any;
};

export interface CommentEditInterface {
    edit(id: string, body: string): any;
}