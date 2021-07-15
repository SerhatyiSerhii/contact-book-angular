export class ContactItem {
    public readonly id: number;
    public bestFriend: boolean = false;

    constructor(public name: string, public surname: string, public phone?: string, public email?: string) {}
}