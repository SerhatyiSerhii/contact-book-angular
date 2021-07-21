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

    public getContacts(): ContactItem[] {
        return this.contacts;
    }

    public addContact(contact: ContactItem): void {
        this.contacts.push(contact);
    }

    public deleteContact(index: number): void {
        this.contacts.splice(index, 1);
    }
}