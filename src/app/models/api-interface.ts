import { Observable } from "rxjs";
import { ContactItem } from "./contac-item";

export interface ApiInterface {
    getContacts(): Observable<ContactItem[]>;
    getContactById(id: number): Observable<ContactItem>;
    addContact(contact: ContactItem): Observable<ContactItem>;
    updateContact(id: number, contact: ContactItem): Observable<ContactItem>;
    deleteContact(id: number): Observable<ContactItem>;
}