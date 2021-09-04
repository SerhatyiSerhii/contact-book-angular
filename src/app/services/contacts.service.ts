import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContactItem } from "../models/contac-item";
import { ApiService } from "./api.service";
import { tap } from "rxjs/operators"
import { ApiStubService } from "./api-stub.service";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    private contactsListUpdated$: Subject<void> = new Subject<void>();

    constructor(private api: ApiService, private apiStub: ApiStubService) { }

    public getContactsListUpdated(): Observable<void> {
        return this.contactsListUpdated$;
    }

    public getContacts(): Observable<ContactItem[]> {
        return this.api.getContacts().pipe(tap((contacts: ContactItem[]) => {
            this.sortContacts(contacts);
        }));
    }

    public getContactById(id: number): Observable<ContactItem> {
        return this.api.getContactById(id);
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        return this.api.addContact(contact).pipe(tap((item: ContactItem) => {

            this.apiStub.addContact(item);

            this.contactsListUpdated$.next();
        }));
    }

    public deleteContact(id: number): Observable<ContactItem> {
        return this.api.deleteContact(id).pipe(tap(() => {

            this.apiStub.deleteContact(id);

            this.contactsListUpdated$.next();
        }));
    }

    public updateContact(id: number, updatedContact: ContactItem): Observable<ContactItem> {
        return this.api.updateContact(id, updatedContact).pipe(tap(() => {

            this.apiStub.updateContact(id, updatedContact);

            this.contactsListUpdated$.next();
        }));
    }

    private sortContacts(contacts: ContactItem[]): void {
        contacts.sort((a, b) => {
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