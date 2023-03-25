import {Discussion} from "../../models/discussion";

export interface CommentByIdentifierInterface
{
    findByIdentifier(identifier: string): Discussion;
}