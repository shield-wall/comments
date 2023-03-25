import {Octokit} from "@octokit/core";
import * as core from '@actions/core';
import {DiscussionCommentSaveProcessor} from "./processors/discussion-comment-save-processor";
import {Config} from "./inputs/config";
import {InputProcessor} from "./processors/input-processor";

async function run(): Promise<void> {
    try {
        const octokit = new Octokit({auth: core.getInput('token')});

        const config: Config = {
            organization: core.getInput('organization'),
            repository: core.getInput('repository'),
            discussionId: parseInt(core.getInput('discussionId')),
            bodyFileHeader: core.getInput('bodyFileHeader'),
            body: core.getInput('body'),
            bodyFileFooter: core.getInput('bodyFileFooter'),
        };

        // process body
        let body = new InputProcessor().processBody(config);

        //process discussion
        let processor = new DiscussionCommentSaveProcessor(octokit, config);
        processor.process({identifier: config.discussionId, body: body});
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()