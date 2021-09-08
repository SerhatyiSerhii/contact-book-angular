import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiInterface } from "../models/api-interface";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiStubService implements ApiInterface {
    private storageKey: string = 'contacts';

    public getContacts(): Observable<ContactItem[]> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey));

        if (!values) {
            return of([]);
        } else {
            return of(values);
        }
    }

    public getContactById(id: number): Observable<ContactItem> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey));

        const item = values.find((item) => {
            return item.id === id;
        });

        return of(item);
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        if (this.storageKey in localStorage) {
            const contactsArray = JSON.parse(localStorage.getItem(this.storageKey));

            contactsArray.push(contact);

            localStorage.setItem(this.storageKey, JSON.stringify(contactsArray));
        } else {
            localStorage.setItem(this.storageKey, JSON.stringify([contact]));
        }

        return of(contact);
    }

    public updateContact(id: number, contact: ContactItem): Observable<ContactItem> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey));

        const item = values.find((item) => {
            return item.id === id;
        });

        item.name = contact.name;
        item.surname = contact.surname;
        item.phone = contact.phone;
        item.email = contact.email;
        item.favorite = contact.favorite;

        localStorage.setItem(this.storageKey, JSON.stringify(values));

        return of(item);
    }

    public deleteContact(id: number): Observable<ContactItem> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey)).filter((item: ContactItem) => {
            return item.id !== id;
        });

        const deltedItem: ContactItem = JSON.parse(localStorage.getItem(this.storageKey)).find((item: ContactItem) => {
            return item.id === id;
        });

        localStorage.setItem(this.storageKey, JSON.stringify(values));

        if (!values.length) {
            localStorage.clear();
            return of(deltedItem);
        }

        return of(deltedItem);
    }
}