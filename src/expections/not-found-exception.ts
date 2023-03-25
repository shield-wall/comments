export class NotFoundException extends Error
{
    constructor() {
        super('Object not found');
    }
}