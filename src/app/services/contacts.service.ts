import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContactItem } from "../models/contac-item";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: ContactItem[] = [];

    private contactsListUpdated$: Subject<void> = new Subject<void>();

    constructor(private api: ApiService) { }

    public getContactsListUpdated(): Observable<void> {
        return this.contactsListUpdated$;
    }

    public async getContacts(): Promise<ContactItem[]> {
        await this.api.getContacts().then((data: ContactItem[])=> {
            this.contacts = data;
        });

        return this.contacts;
    }

    public async getContactById(id: number): Promise<ContactItem> {

        let contact: ContactItem;

        await this.api.getContactById(id).then((data: ContactItem) => {
            contact = data;
        });

        return contact;
    }

    public addContact(contact: ContactItem): void {

        this.api.addContact(contact).subscribe(() => {
            this.contactsListUpdated$.next();
        });
    }

    public deleteContact(id: number): void {

        this.api.deleteContact(id).subscribe(() => {
            this.contactsListUpdated$.next();
        })
    }

    public updateContact(id: number, updatedContact: ContactItem): void {
        const item = this.contacts.find(item => {
            return item.id === id;
        });

        item.name = updatedContact.name;
        item.surname = updatedContact.surname;
        item.phone = updatedContact.phone;
        item.email = updatedContact.email;

        this.api.updateContact(id, updatedContact).subscribe(() => {
            this.contactsListUpdated$.next();
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
        });
    }
}