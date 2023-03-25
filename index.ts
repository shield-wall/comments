import {Octokit} from "@octokit/core";
import {DiscussionRepository} from "./src/respository/comment/discussion-repository";

// TODO change process args for inputs from github action.
const config = {organization: process.argv[3], repository: process.argv[4]}
const octokit = new Octokit({auth: process.argv[2]});

let repository = new DiscussionRepository(octokit, config);

// @ts-ignore
let discussion = await repository.findByIdentifier(723);
console.log(discussion);
console.log(process.argv[2]);