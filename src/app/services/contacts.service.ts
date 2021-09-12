import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContactItem } from "../models/contac-item";
import { ApiService } from "./api.service";
import { map, tap } from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contactsListUpdated$: Subject<void> = new Subject<void>();

    constructor(private api: ApiService) { }

    public getContactsListUpdated(): Observable<void> {
        return this.contactsListUpdated$;
    }

    public getContacts(): Observable<ContactItem[]> {
        return this.api.getContacts().pipe(map((contacts: ContactItem[]) => {
            return this.sortContacts(contacts);
        }));
    }

    public getContactById(id: number): Observable<ContactItem> {
        return this.api.getContactById(id);
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        return this.api.addContact(contact).pipe(tap(() => {
            this.contactsListUpdated$.next();
        }));
    }

    public deleteContact(id: number): Observable<void> {
        return this.api.deleteContact(id).pipe(tap(() => {
            this.contactsListUpdated$.next();
        }));
    }

    public updateContact(id: number, updatedContact: ContactItem): Observable<ContactItem> {
        return this.api.updateContact(id, updatedContact).pipe(tap(() => {
            this.contactsListUpdated$.next();
        }));
    }

    private sortContacts(contacts: ContactItem[]): ContactItem[] {
        contacts.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }

            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }

            return 0;
        });

        return contacts;
    }
}