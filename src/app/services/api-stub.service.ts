import { Injectable } from "@angular/core";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiStubService {

    public getContacts(): ContactItem[] {
        const values = [];

        const keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; i++) {
            values.push(JSON.parse(localStorage.getItem(keys[i])));
        }

        return values;
    }

    public getContactById(id: number): ContactItem {
        return JSON.parse(localStorage.getItem(`${id}`));
    }

    public addContact(contact: ContactItem): void {
        localStorage.setItem(`${contact.id}`, JSON.stringify(contact));
    }

    public updateContact(id: number, contact: ContactItem): void {
        localStorage.setItem(`${id}`, JSON.stringify(contact));
    }

    public deleteContact(id: number): void {
        localStorage.removeItem(`${id}`);
    }
}