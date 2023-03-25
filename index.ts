import {Octokit} from "@octokit/core";
import {DiscussionCommentSaveProcessor} from "./src/processors/discussion-comment-save-processor";
import {Config} from "./src/inputs/config";
import {InputProcessor} from "./src/processors/input-processor";

// TODO change process args for inputs from github action.
const config: Config = {
    token: process.argv[2],
    organization: process.argv[3],
    repository: process.argv[4],
    discussionId: 738,
    bodyFileHeader: './playground/header.md',
    // bodyFileHeader: undefined,
    body: 'hel[lo](https://google.com) **middle**',
    bodyFileFooter: undefined,
};

//github api
const octokit = new Octokit({auth: config.token});

// process body
let body = new InputProcessor().processBody(config);

//process discussion
let processor = new DiscussionCommentSaveProcessor(octokit, config);
processor.process({identifier: config.discussionId, body: body});