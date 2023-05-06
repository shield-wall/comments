import {Octokit} from "@octokit/core";
import {CommentAddInterface, CommentByIdentifierInterface, CommentEditInterface} from "./comment-interface";
import {Config} from "../../inputs/config";
import {Discussion} from "../../models/discussion";
import {DiscussionRepositoryMapping} from "../../mapping/discussion-repository";
import {NotFoundException} from "../../expections/not-found-exception";

export class DiscussionRepository
    implements
        CommentByIdentifierInterface,
        CommentAddInterface,
        CommentEditInterface {
    constructor(
        private readonly octokit: Octokit,
        private readonly config: Config
    ) {
    }

    // @ts-ignore
    async findByIdentifier(identifier: number): Discussion {
        // https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions
        const response: DiscussionRepositoryMapping = await this.octokit.graphql(
            `query($organization: String!, $repository: String!) {
            
                      repository(owner: $organization, name: $repository) {
                        discussions(first: 10) {
                          # type: DiscussionConnection
                          totalCount # Int!
                          
                          nodes{
                            # type: Discussion
                            id
                            number
                            author { login }
                            
                            comments(first:1) { 
                               totalCount
                               nodes {
                                  id
                                  author { login }
                                  body
                               }
                            }
                            
                          }
                         
                        }
                      }
                      
                    }`, this.config
        );

        let discussionFromGithub = response.repository.discussions.nodes.
            filter(discussion => discussion.number === identifier)[0];

        let discussion = new Discussion(discussionFromGithub)

        if (discussion === undefined)
            throw new NotFoundException();

        return discussion;
    }

    //TODO when implements new resources like issue and pull request those
    //     parameters need to be updated for a common type.
    async add(discussionId: string, body: string) {
        // https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#mutations
        const response: DiscussionRepositoryMapping = await this.octokit.graphql(
            `mutation($body: String!, $discussionId: ID!) {
                      addDiscussionComment(input: {body: $body, discussionId: $discussionId}) {
                    
                        # response type: CreateDiscussionPayload
                        comment {
                           id
                        }
                      }
                    }`, {body: body, discussionId: discussionId}
        );

        console.log(response);
    }

    async edit(commentId: string, body: string) {
        // https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#mutations
        const response: DiscussionRepositoryMapping = await this.octokit.graphql(
            `mutation($body: String!, $commentId: ID!) {
                      updateDiscussionComment(input: {body: $body, commentId: $commentId}) {
                    
                        # response type: CreateDiscussionPayload
                        comment {
                           id
                        }
                      }
                    }`, {body: body, commentId: commentId}
        );

        console.log(response);
    }
}