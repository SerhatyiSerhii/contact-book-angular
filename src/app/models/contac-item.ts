export class ContactItem {
    private static idGenerator = 1;

    public readonly id: number;
    public favorite: boolean = false;

    constructor(public name: string, public surname: string, public phone?: string, public email?: string) {
        this.id = ContactItem.idGenerator++;
    }
}