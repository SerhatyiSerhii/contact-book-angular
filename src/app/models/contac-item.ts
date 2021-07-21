export class ContactItem {
    public readonly id?: number;
    public favorite: boolean = false;
    public edit: boolean = false;

        constructor(public name: string, public surname: string, public phone?: string, public email?: string) { }
}