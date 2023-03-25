export type Config = {
    token: string;
    organization: string;
    repository: string;
    discussionId: number;
    bodyFileHeader: string|undefined;
    body: string|undefined;
    bodyFileFooter: string|undefined;
}