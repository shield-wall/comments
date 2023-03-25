import {Octokit} from "@octokit/core";
import * as core from '@actions/core';
import {DiscussionCommentSaveProcessor} from "./src/processors/discussion-comment-save-processor";
import {Config} from "./src/inputs/config";
import {InputProcessor} from "./src/processors/input-processor";

const octokit = new Octokit({auth: core.getIDToken()});

// TODO change process args for inputs from github action.
const config: Config = {
    organization: core.getInput('organization', {required: true}),
    repository: core.getInput('repository', {required: true}),
    discussionId: parseInt(core.getInput('discussionId', {required: true})),
    bodyFileHeader: core.getInput('bodyFileHeader', {required: false}),
    body: core.getInput('body', {required: false}),
    bodyFileFooter: core.getInput('bodyFileFooter', {required: false}),
};

// process body
let body = new InputProcessor().processBody(config);

//process discussion
let processor = new DiscussionCommentSaveProcessor(octokit, config);
processor.process({identifier: config.discussionId, body: body});