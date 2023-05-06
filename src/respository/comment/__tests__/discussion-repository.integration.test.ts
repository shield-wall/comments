import {Octokit} from "@octokit/core";
import {DiscussionRepository} from "../discussion-repository";
import {Config} from "../../../inputs/config";
import {Discussion} from "../../../models/discussion";

describe('Integration test for discussions.', () => {
    it('is parsing discussion from github.', async () => {
        const octokit = new Octokit({auth: process.env.GITHUB_TOKEN });
        const config : Config = {
            organization: 'shield-wall',
            repository: 'myprofile',
            discussionId: Number(755),
            body: 'Body from integration test.',
            bodyFileHeader: '',
            bodyFileFooter: '',
        };

        let repository = new DiscussionRepository(octokit, config);
        let discussion = await repository.findByIdentifier(config.discussionId);

        expect(discussion).toBeInstanceOf(Discussion);
    });
});