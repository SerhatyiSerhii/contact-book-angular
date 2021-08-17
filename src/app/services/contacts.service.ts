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

    public getContactById(id: number): ContactItem | undefined {
        return this.contacts.find(contact => contact.id == id);
    }

    public addContact(contact: ContactItem): void {
        this.contacts.push(contact);
    }

    public deleteContact(contact: ContactItem): void {
        this.contacts = this.contacts.filter((item) => {
            return contact.id != item.id;
        });
    }

    public sortContacts(): void {
        this.contacts.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }

            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }

            return 0;
        })
    }
}