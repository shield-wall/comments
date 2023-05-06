import './sourcemap-register.cjs';/******/ "use strict";
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (undefined && undefined.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (undefined && undefined.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@octokit/core");
const core = __importStar(require("@actions/core"));
const discussion_comment_save_processor_1 = require("./processors/discussion-comment-save-processor");
const input_processor_1 = require("./processors/input-processor");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const octokit = new core_1.Octokit({ auth: core.getInput('token') });
            const config = {
                organization: core.getInput('organization'),
                repository: core.getInput('repository'),
                discussionId: parseInt(core.getInput('discussionId')),
                bodyFileHeader: core.getInput('bodyFileHeader'),
                body: core.getInput('body'),
                bodyFileFooter: core.getInput('bodyFileFooter'),
            };
            // process body
            let body = new input_processor_1.InputProcessor().processBody(config);
            //process discussion
            let processor = new discussion_comment_save_processor_1.DiscussionCommentSaveProcessor(octokit, config);
            processor.process({ identifier: config.discussionId, body: body });
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();


//# sourceMappingURL=index.js.map