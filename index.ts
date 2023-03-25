import {Octokit} from "@octokit/core";
import * as core from '@actions/core';
import {DiscussionCommentSaveProcessor} from "./src/processors/discussion-comment-save-processor";
import {Config} from "./src/inputs/config";
import {InputProcessor} from "./src/processors/input-processor";

async function run() {
    try {
        const octokit = new Octokit({auth: core.getIDToken()});

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
        core.setFailed(error.message);
    }
}

run()