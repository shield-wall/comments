import {Octokit} from "@octokit/core";
import {CommentByIdentifierInterface} from "./comment-interface";
import {Config} from "../../inputs/config";
import {Discussion} from "../../models/discussion";
import {DiscussionRepositoryMapping} from "../../mapping/discussion-repository";
import {NotFoundException} from "../../expections/not-found-exception";

export class DiscussionRepository implements CommentByIdentifierInterface {
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

        let discussions = response.repository.discussions.nodes.map(
            (_discussion) => new Discussion(_discussion)
        );

        let discussion = discussions.find(
            (discussion) => discussion.getIdentifier() === identifier
        );

        if (discussion === undefined)
            throw new NotFoundException();

        return discussion;
    }
}