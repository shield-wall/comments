export type Config = {
    organization: string;
    repository: string;
    discussionId: number;
    bodyFileHeader: string|undefined;
    body: string|undefined;
    bodyFileFooter: string|undefined;
}