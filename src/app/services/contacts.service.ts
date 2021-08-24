import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: ContactItem[] = [
        new ContactItem('Ivan', 'Ivanov', '123456879', 'ivanov@ivan.test'),
        new ContactItem('Petr', 'Petrov', '987654321', 'petrov@petr.test')
    ];

    private contactsListUpdated$: Subject<void> = new Subject<void>();

    public getContactsListUpdated(): Observable<void> {
        return this.contactsListUpdated$;
    }

    public getContacts(): ContactItem[] {
        return this.contacts;
    }

    public getContactById(id: number): ContactItem {
        return this.contacts.find(contact => contact.id === id);
    }

    public addContact(contact: ContactItem): void {
        this.contacts.push(contact);
        this.contactsListUpdated$.next();
    }

    public deleteContact(id: number): void {
        this.contacts = this.contacts.filter((item) => {
            return id != item.id;
        });
        this.contactsListUpdated$.next();
    }

    public updateContact(contact: ContactItem): void {
        this.deleteContact(contact.id);
        this.addContact(contact);
        this.contactsListUpdated$.next();
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