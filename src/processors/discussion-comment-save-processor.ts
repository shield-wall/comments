import {DiscussionRepository} from "../respository/comment/discussion-repository";
import {Octokit} from "@octokit/core";
import {Config} from "../inputs/config";

export class DiscussionCommentSaveProcessor {

    constructor(
        private readonly octokit: Octokit,
        private readonly config: Config
    ) {
    }

    //TODO we need to refactor for some type.
    async process(resouce: { identifier: number, body: string }) {
        let repository = new DiscussionRepository(this.octokit, this.config);

        let discussion = await repository.findByIdentifier(resouce.identifier);
        console.log(discussion);

        if(discussion.getComments().length === 0) {
            await repository.add(discussion.getId(), resouce.body);
            return;
        }

        await repository.edit(discussion.getComments()[0].getId(), resouce.body);
    }
}