import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IApiService } from "../models/api-interface";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiStubService implements IApiService {
    private storageKey: string = 'contacts';

    public getContacts(): Observable<ContactItem[]> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey)) ?? [];

        return of(values);
    }

    public getContactById(id: number): Observable<ContactItem> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey));

        const item = values.find(item => item.id === id);

        return of(item);
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        const contactsArray: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey)) ?? [];

        contactsArray.push(contact);

        localStorage.setItem(this.storageKey, JSON.stringify(contactsArray));

        return of(contact);
    }

    public updateContact(id: number, contact: ContactItem): Observable<ContactItem> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey));

        const item = values.find(item => item.id === id);

        item.name = contact.name;
        item.surname = contact.surname;
        item.phone = contact.phone;
        item.email = contact.email;
        item.favorite = contact.favorite;

        localStorage.setItem(this.storageKey, JSON.stringify(values));

        return of(item);
    }

    public deleteContact(id: number): Observable<void> {
        const values: ContactItem[] = JSON.parse(localStorage.getItem(this.storageKey))
            .filter((item: ContactItem) => item.id !== id);

        localStorage.setItem(this.storageKey, JSON.stringify(values));

        return of(null);
    }
}