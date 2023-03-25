import {Config} from "../inputs/config";

export class InputProcessor
{
    processBody(config: Config): string {
        //TODO need to fix the files;
        return <string>config.body;
        // let body = '';
        //
        // if(config.bodyFileHeader !== undefined)
        //     body += fs.readFileSync(config.bodyFileHeader, "utf8");
        //
        // if (config.body !== undefined)
        //     body += config.body;
        //
        // if(config.bodyFileFooter !== undefined)
        //     body += fs.readFileSync(config.bodyFileFooter, "utf8");
        //
        // return body;
    }
}