import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiStubService {
    public getContacts(): Observable<ContactItem[]> {
        return new Observable<ContactItem[]>((subcriber) => {
            if ('contacts' in localStorage) {
                const keys: string[] = Object.keys(localStorage);

                const values: ContactItem[] = JSON.parse(localStorage.getItem(keys[0]));

                subcriber.next(values);
            }
        });
    }

    public getContactById(id: number): Observable<ContactItem> {

        return new Observable<ContactItem>((subscriber) => {
            const keys: string[] = Object.keys(localStorage);

            const values: ContactItem[] = JSON.parse(localStorage.getItem(keys[0]));

            const item = values.find((item) => {
                return item.id === id;
            });

            subscriber.next(item);
        });
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        return new Observable<ContactItem>((subscriber) => {
            if ('contacts' in localStorage) {
                const contactsArray = JSON.parse(localStorage.getItem('contacts'));

                contactsArray.push(contact);

                localStorage.setItem('contacts', JSON.stringify(contactsArray));
            } else {
                localStorage.setItem('contacts', JSON.stringify([contact]));
            }

            subscriber.next();
        });
    }

    public updateContact(id: number, contact: ContactItem): Observable<ContactItem> {

        return new Observable<ContactItem>((subscriber) => {
            const keys: string[] = Object.keys(localStorage);

            const values: ContactItem[] = JSON.parse(localStorage.getItem(keys[0]));

            const item = values.find((item) => {
                return item.id === id;
            });

            item.name = contact.name;
            item.surname = contact.surname;
            item.phone = contact.phone;
            item.email = contact.email;
            item.favorite = contact.favorite;

            localStorage.setItem('contacts', JSON.stringify(values));

            subscriber.next(item);
        });
    }

    public deleteContact(id: number): Observable<ContactItem> {
        return new Observable<ContactItem>((subscriber) => {
            const keys: string[] = Object.keys(localStorage);

            const values: ContactItem[] = JSON.parse(localStorage.getItem(keys[0])).filter((item: ContactItem) => {
                return item.id !== id;
            });

            localStorage.setItem('contacts', JSON.stringify(values));

            subscriber.next();

            if (!values.length) {
                localStorage.clear();
                subscriber.next();
            }
        });
    }
}