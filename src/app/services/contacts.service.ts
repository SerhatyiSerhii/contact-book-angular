import { Injectable } from "@angular/core";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: ContactItem[] = [
        new ContactItem('Ivan', 'Ivanov', '123456879', 'ivanov@ivan.test'),
        new ContactItem('Petr', 'Petrov', '987654321', 'petrov@petr.test')
    ];
    public edit: boolean = false;

    public setEdit() {
        this.edit = true;
    }

    public setNoEdit() {
        this.edit = false;
    }

    public getContacts(): ContactItem[] {
        return this.contacts;
    }

    public getContactById(id: number): ContactItem | undefined {
        return this.contacts.find(contact => {
            return contact.id == id;
        });
    }

    public addContact(contact: ContactItem): void {
        this.contacts.push(contact);
    }

    public deleteContact(contact: ContactItem): void {
        this.contacts.splice(this.contacts.indexOf(contact), 1);
    }

    public sortContacts(): void {
        this.contacts.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), undefined, { numeric: true, sensitivity: 'base' });
        })
    }
}