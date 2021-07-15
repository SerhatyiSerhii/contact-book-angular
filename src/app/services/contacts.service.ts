import { Injectable } from "@angular/core";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contacts: ContactItem[] = [];

    public getContacts(): ContactItem[] {
        return this.contacts;
    }

    public addContact(contact: ContactItem): void {
        this.contacts.push(contact);
    }
}