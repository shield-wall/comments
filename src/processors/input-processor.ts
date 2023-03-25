import {Config} from "../inputs/config";
import * as fs from "fs";

export class InputProcessor
{
    processBody(config: Config): string {
        let body = '';

        if(config.bodyFileHeader !== undefined)
            body += fs.readFileSync(config.bodyFileHeader, "utf8");

        if (config.body !== undefined)
            body += config.body;

        if(config.bodyFileFooter !== undefined)
            body += fs.readFileSync(config.bodyFileFooter, "utf8");

        return body;
    }
}